import { AddAccountRepository } from '../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailOrCpf, LoadAccountByEmailOrCpfParams } from '../../../data/usecases/add-account/db-add-account-protocols'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountParams } from '../../../domain/usecases/add-account'
import { Account } from '../type-orm/entities/Account'
import { PgHelper } from '../type-orm/postgresql/helpers/postgres-helper'

export class AccountPostgresRepository implements AddAccountRepository, LoadAccountByEmailOrCpf {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountRepository = await PgHelper.getRepository(Account)
    const newAccount = await accountRepository.create(accountData)
    await accountRepository.save(newAccount)
    return newAccount
  }

  async load (params: LoadAccountByEmailOrCpfParams): Promise<AccountModel> {
    const { cpf, email } = params
    const accountRepository = await PgHelper.getRepository(Account)
    const account = await accountRepository.find({
      where: [{ cpf }, { email }]
    })
    return account.length ? account[0] : null
  }
}
