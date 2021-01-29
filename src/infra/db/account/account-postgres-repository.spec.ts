import connection from '../type-orm/postgresql/helpers/pg-typeorm-helper'
import { AccountPostgresRepository } from './account-postgres-repository'

describe('Account Postgres Repository', () => {
    const client = connection

    beforeAll(async () => {
        await client.create()
    })

    afterAll(async () => {
        await client.close()
    })
    
    beforeEach(async () => {
        await client.clear()
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
        expect(account.name).toBe('any_nameASDASDAS')
    })
})