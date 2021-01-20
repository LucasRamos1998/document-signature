import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountParams } from '../../../domain/usecases/add-account'
import { Hasher } from '../../protocols/cryptography/Hasher'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {}
  async add (accountParams: AddAccountParams): Promise<AccountModel> {
    await this.hasher.hash(accountParams.password)
    return null
  }
}
