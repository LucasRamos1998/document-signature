import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class SignupController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) return badRequest(new MissingParamError('name'))
    return null
  }
}
