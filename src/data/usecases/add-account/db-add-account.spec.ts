import { DbAddAccount } from './db-add-account'
import { AddAccountParams, AddAccountRepository, LoadAccountByEmailOrCpf } from './db-add-account-protocols'
import { Hasher } from '../../protocols/cryptography/Hasher'
import { AccountModel } from '../../../domain/models/account'

const makeFakeAccountData = (): AddAccountParams => ({
  name: 'valid_name',
  cpf: 'valid_cpf',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve({
        id: 'any_id',
        name: 'valid_name',
        cpf: 'valid_cpf',
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      })
    }
  }
  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailOrCpf = (): LoadAccountByEmailOrCpf => {
  class LoadAccountByEmailOrCpfStub implements LoadAccountByEmailOrCpf {
    async load (params: {}): Promise<AccountModel> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailOrCpfStub()
}

interface sutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  LoadAccountByEmailOrCpfStub: LoadAccountByEmailOrCpf
}

const makeSut = (): sutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const LoadAccountByEmailOrCpfStub = makeLoadAccountByEmailOrCpf()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, LoadAccountByEmailOrCpfStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    LoadAccountByEmailOrCpfStub
  }
}

describe('DbAddAccount usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeAccountData())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountData())
    await expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      cpf: 'valid_cpf',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual({
      id: 'any_id',
      name: 'valid_name',
      cpf: 'valid_cpf',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should return null if LoadAccountByEmailOrCpf does not return null', async () => {
    const { sut, LoadAccountByEmailOrCpfStub } = makeSut()
    jest.spyOn(LoadAccountByEmailOrCpfStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve({
      id: 'any_id',
      name: 'valid_name',
      cpf: 'valid_cpf',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })))
    const account = await sut.add(makeFakeAccountData())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailOrCpf with correct values', async () => {
    const { sut, LoadAccountByEmailOrCpfStub } = makeSut()
    const addSpy = jest.spyOn(LoadAccountByEmailOrCpfStub, 'load')
    await sut.add(makeFakeAccountData())
    await expect(addSpy).toHaveBeenCalledWith({
      cpf: 'valid_cpf',
      email: 'valid_email@mail.com'
    })
  })
})
