import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { SignupController } from './signup-controller'
import { AddAccount, AddAccountParams } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import { EmailInUseError } from '../../errors/email-in-use-error'
// import { CompareFieldsError } from '../../errors/compare-fields-error'
import { EmailValidator, HttpRequest } from '../../protocols'

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (accountParams: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        password: 'any_password',
        cpf: 'any_cpf',
        email: 'any_email@mail.com'
      }))
    }
  }
  return new AddAccountStub()
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidator implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidator()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password',
    cpf: 'any_cpf',
    email: 'any_email@mail.com'
  }
})

interface sutTypes {
  sut: SignupController
  addAccountStub: AddAccount
  emailValidatorStub: EmailValidator
}

const makeSut = (): sutTypes => {
  const addAccountStub = makeAddAccount()
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignupController(addAccountStub, emailValidatorStub)
  return {
    sut,
    addAccountStub,
    emailValidatorStub
  }
}

describe('Signup Controller', () => {
  test('Should return 400 if name is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        cpf: 'any_cpf',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        email: 'any_email@mail.com'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if cpf is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        email: 'any_email@mail.com'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('cpf')))
  })

  test('Should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
        cpf: 'any_cpf'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if password is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        cpf: 'any_cpf',
        passwordConfirmation: 'any_password',
        email: 'any_email@mail.com'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if password is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        password: 'any_password',
        cpf: 'any_cpf',
        email: 'any_email@mail.com'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new EmailInUseError())
  })

  test('Should call add with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      password: 'any_password',
      cpf: 'any_cpf',
      email: 'any_email@mail.com'
    })
  })

  test('Should call EmailValidatior with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
