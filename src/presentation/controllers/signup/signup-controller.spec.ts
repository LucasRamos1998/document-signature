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
})
