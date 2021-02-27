import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.userRepository.signUp(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    try {
      const existingUser = await this.userRepository.signIn(authCredentialsDto)
      const isPasswordGood = await existingUser.checkPassword(
        authCredentialsDto.password,
        existingUser.password,
      )

      if (isPasswordGood) {
        const payload = { username: existingUser.username }
        const token: string = this.jwtService.sign(payload)
        this.logger.debug(`Generated JWT with payload. ${JSON.stringify(payload)}`)
        return { token }
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials')
    }
  }
}
