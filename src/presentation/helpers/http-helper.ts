import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: 'Internal Server Error'
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
