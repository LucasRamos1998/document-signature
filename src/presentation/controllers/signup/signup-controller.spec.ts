import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { SignupController } from './signup-controller'

describe('Signup Controller', () => {
  test('Should return 400 if name is not provided', async () => {
    const sut = new SignupController()
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
    const sut = new SignupController()
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
    const sut = new SignupController()
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
    const sut = new SignupController()
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
    const sut = new SignupController()
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
})
