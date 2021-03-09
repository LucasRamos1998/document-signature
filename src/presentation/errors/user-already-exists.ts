export class UserAlreadyExists extends Error {
  constructor () {
    super('The CPF or Email received already exists')
    this.name = 'UserAlreadyExists'
  }
}
