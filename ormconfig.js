module.exports = {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'tests',
    dropSchema: true,
    logging: false,
    synchroize: true,
    migrationsRun: true,
    entities: ['src/infra/db/type-orm/entities/*.ts'],
    migrations: ['src/infra/db/type-orm/migrations/*.ts'],
    cli: {
      entitiesDir: 'src/infra/db/type-orm/entities',
      migrationsDir: 'src/infra/db/type-orm/migrations',
    },
  };