import { newDb } from 'pg-mem'
import { Connection } from 'typeorm'
import { Account } from '../../entities/Account'

const connection = {
  test: {
    client: null as Connection,

    async create () {
      const db = newDb()
      this.client = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [Account]
      })
      await this.client.synchronize()
    },

    async close () {
      await this.client.close()
    },

    async clear () {
      const entities = this.client.entityMetadatas
      entities.forEach(async (entity) => {
        const repository = this.client.getRepository(entity.name)
        await repository.query(`DELETE FROM ${entity.tableName}`)
      })
    }
  }

}

export default connection.test