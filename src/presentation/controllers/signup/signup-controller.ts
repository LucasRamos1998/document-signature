import { AddAccount } from '../../../domain/usecases/add-account'
import { CompareFieldsError } from '../../errors/compare-fields-error'
import { EmailInUseError } from '../../errors/email-in-use-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { UserAlreadyExists } from '../../errors/user-already-exists'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly emailValidator: EmailValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'cpf', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const { name, cpf, email, password, passwordConfirmation } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) return badRequest(new EmailInUseError())
      if (password !== passwordConfirmation) return badRequest(new CompareFieldsError('password', 'passwordConfirmation'))

      const newAccount = await this.addAccount.add({
        name,
        cpf,
        email,
        password
      })
      if (!newAccount) return badRequest(new UserAlreadyExists())

      return ok(newAccount)
    } catch (err) {
      return serverError()
    }
  }
}
