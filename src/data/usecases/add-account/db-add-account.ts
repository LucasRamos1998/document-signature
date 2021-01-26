import { Hasher, AddAccountRepository, AddAccount, AddAccountParams, AccountModel } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountParams: AddAccountParams): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountParams.password)
    const account = await this.addAccountRepository.add({
      ...accountParams,
      password: hashedPassword
    })

    return account
  }
}
