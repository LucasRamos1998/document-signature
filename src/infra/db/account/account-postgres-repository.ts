import { AddAccountRepository } from "../../../data/protocols/db/account/add-account-repository";
import { AccountModel } from "../../../domain/models/account";
import { AddAccountParams } from "../../../domain/usecases/add-account";
import { Account } from '../type-orm/entities/Account'
import connection from '../type-orm/postgresql/helpers/pg-typeorm-helper'

export class AccountPostgresRepository implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
        const accounts = connection.client.getRepository(Account)
        const newAccount = await accounts.create(accountData).save()
        return newAccount
    }
}