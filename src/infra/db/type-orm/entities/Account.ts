import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', length: 50 })
  name: string

  @Column({ type: 'text', length: 11, unique: true })
  cpf: string

  @Column({ type: 'text', length: 50, unique: true })
  email: string

  @Column({ type: 'text', length: 30 })
  password: string
}
