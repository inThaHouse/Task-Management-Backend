import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import * as bcrypt from 'bcryptjs'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
  }
}
