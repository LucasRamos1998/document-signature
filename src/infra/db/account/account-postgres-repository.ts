import { AddAccountRepository } from '../../../data/protocols/db/account/add-account-repository'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountParams } from '../../../domain/usecases/add-account'
import { Account } from '../type-orm/entities/Account'
import { PgHelper } from '../type-orm/postgresql/helpers/postgres-helper'

export class AccountPostgresRepository implements AddAccountRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountRepository = await PgHelper.getRepository(Account)
    const newAccount = await accountRepository.create(accountData)
    await accountRepository.save(newAccount)
    return newAccount
  }
}
