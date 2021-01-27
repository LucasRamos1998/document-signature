import { newDb } from 'pg-mem'
import { Connection } from 'typeorm'
import typeOrmConfig from '../../../../../../ormconfig'

const connection = {
  test: {
    client: null as Connection,

    async create () {
      const db = newDb()
      this.client = await db.adapters.createTypeormConnection(typeOrmConfig)
    },

    async close () {
      await this.client.close()
    },

    async clear () {
      const entities = this.client.entityMetadata

      entities.forEach(async (entity) => {
        const repository = this.client.getRepository(entity.name)
        await repository.query(`DELETE FROM ${entity.tableName}`)
      })
    }
  }

}

export default connection
