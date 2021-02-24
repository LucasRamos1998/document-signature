module.exports = {
  "type": 'postgres',
  "host": 'localhost',
  "port": 5432,
  "username": process.env.POSTGRES_USER || 'admin123',
  "password": process.env.POSTGRES_PASSWORD || '01lucas123*',
  "database": process.env.POSTGRES_DB || 'dbTest',
  "logging": false,
  "synchronize": true,
  "entities": ['src/infra/db/type-orm/entities/*.ts'],
  "migrations": ['src/infra/db/type-orm/migrations/*.ts'],
  "cli": {
    "entitiesDir": 'src/infra/db/type-orm/entities',
    "migrationsDir": 'src/infra/db/type-orm/migrations',
  }
};