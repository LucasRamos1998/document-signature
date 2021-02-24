import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Accounts1614124389190 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar(60)'
          },
          {
            name: 'cpf',
            type: 'varchar(11)',
            isUnique: true
          },
          {
            name: 'email',
            type: 'varchar(50)',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar(30)'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Accounts')
  }
}
