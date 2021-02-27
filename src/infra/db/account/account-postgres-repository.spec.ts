import { Account } from '../type-orm/entities/Account'
import { PgHelper } from '../type-orm/postgresql/helpers/postgres-helper'
import { AccountPostgresRepository } from './account-postgres-repository'

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

  describe('add()', () => {
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

  describe('load()', () => {
    test('should return an account if email exists', async () => {
      const sut = makeSut()
      await sut.add({
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const account = await sut.load({ cpf: 'other_cpf', email: 'any_email@mail.com' })
      expect(account).toBeTruthy()
    })

    test('should return an account if cpf exists', async () => {
      const sut = makeSut()
      await sut.add({
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const account = await sut.load({ cpf: 'any_cpf', email: 'other_email@mail.com' })
      expect(account).toBeTruthy()
    })
  })
})
