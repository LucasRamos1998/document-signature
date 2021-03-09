module.exports = {
  "type": 'postgres',
  "host": 'localhost',
  "port": 5432, 
  "username": process.env.DB_USER || 'admin123',
  "password": process.env.DB_PASSWORD || '01lucas123*',
  "database": process.env.DB || 'dbTest',
  "logging": false,
  "synchronize": true,
  "entities": ['src/infra/db/type-orm/entities/*.ts'],
  "migrations": ['src/infra/db/type-orm/migrations/*.ts'],
  "cli": {
    "entitiesDir": 'src/infra/db/type-orm/entities',
    "migrationsDir": 'src/infra/db/type-orm/migrations',
  }
};