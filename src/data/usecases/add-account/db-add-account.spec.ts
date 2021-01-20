import { DbAddAccount } from './db-add-account'
import { AddAccountParams } from './db-add-account-protocols'
import { Hasher } from '../../protocols/cryptography/Hasher'

const makeFakeAccountData = (): AddAccountParams => ({
  name: 'valid_name',
  cpf: 'valid_cpf',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

describe('DbAddAccount usecase', () => {
  test('Should call Hasher with correct password', async () => {
    class HasherStub implements Hasher {
      async hash (value: string): Promise<string> {
        return await Promise.resolve('hashed_password')
      }
    }
    const hasherStub = new HasherStub()
    const sut = new DbAddAccount(hasherStub)
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeAccountData())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })
})
