import { createConnection, Connection, getRepository, Repository, EntityTarget } from 'typeorm'
import 'dotenv/config'

export const PgHelper = {
  client: null as Connection,

  async connect () {
    this.client = await createConnection()
  },

  async disconnect () {
    await this.client.close()
  },

  async getRepository (model: EntityTarget<any>): Promise<Repository<any>> {
    return getRepository(model)
  }
}
