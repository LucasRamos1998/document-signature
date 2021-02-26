import { Hasher, AddAccountRepository, AddAccount, AddAccountParams, AccountModel, LoadAccountByEmailOrCpf } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly LoadAccountByEmailOrCpf: LoadAccountByEmailOrCpf
  ) {}

  async add (accountParams: AddAccountParams): Promise<AccountModel> {
    const { email, cpf } = accountParams
    const existsAccount = await this.LoadAccountByEmailOrCpf.load({ email, cpf })
    if (!existsAccount) {
      const hashedPassword = await this.hasher.hash(accountParams.password)
      const account = await this.addAccountRepository.add({
        ...accountParams,
        password: hashedPassword
      })

      return account
    }
    return null
  }
}
