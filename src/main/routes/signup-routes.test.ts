import request from 'supertest'
import { Account } from '../../infra/db/type-orm/entities/Account'
import { PgHelper } from '../../infra/db/type-orm/postgresql/helpers/postgres-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await PgHelper.connect()
  })
  beforeEach(async () => {
    const accountRepository = await PgHelper.getRepository(Account)
    await accountRepository.clear()
  })
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Maga0',
        cpf: '11111111122',
        email: 'manomango@gmail.com',
        password: '123123',
        passwordConfirmation: '123123'
      })
      .expect(200)
  })
})
