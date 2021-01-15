import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class SignupController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) return badRequest(new MissingParamError('name'))
    if (!httpRequest.body.email) return badRequest(new MissingParamError('email'))
    if (!httpRequest.body.cpf) return badRequest(new MissingParamError('cpf'))
    if (!httpRequest.body.password) return badRequest(new MissingParamError('password'))
    if (!httpRequest.body.passwordConfirmation) return badRequest(new MissingParamError('passwordConfirmation'))
    return null
  }
}
