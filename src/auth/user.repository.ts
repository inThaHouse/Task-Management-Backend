import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { User } from './user.entity'
import * as bcrypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp({ username, password }: AuthCredentialsDto): Promise<string> {
    const user = new User()

    user.username = username
    user.password = await this.hashPassword(password)

    try {
      await user.save()
      return `Your username: ${username} has been created.`
    } catch ({ code }) {
      throw code === '23505'
        ? new ConflictException('Username is already taken. 😢')
        : new InternalServerErrorException()
    }
  }

  async signIn({ username }: AuthCredentialsDto): Promise<User> {
    try {
      const user = await this.findOne({ username })

      return user
    } catch (error) {
      console.error(error)
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 3)
  }
}
