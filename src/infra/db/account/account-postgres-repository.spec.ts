import { AccountPostgresRepository } from './account-postgres-repository'
import { PgHelper } from '../type-orm/postgresql/helpers/postgres-helper'
import { Account } from '../type-orm/entities/Account'

describe('Account Postgres Repository', () => {
  beforeAll(async () => {
    await PgHelper.connect()
  })

  afterAll(async () => {
    await PgHelper.disconnect()
  })

  afterEach(async () => {
    const accountRepository = await PgHelper.getRepository(Account)
    await accountRepository.clear()
  })

  const makeSut = (): AccountPostgresRepository => {
    return new AccountPostgresRepository()
  }
  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      cpf: 'any_cpf',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
  })
})
