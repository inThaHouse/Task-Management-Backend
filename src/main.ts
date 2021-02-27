import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import * as config from 'config'

async function bootstrap() {
  const { port } = config.get('server')
  const PORT = process.env.PORT || port
  const app = await NestFactory.create(AppModule)

  await app.listen(PORT)
  Logger.log(`Server started on port: ${PORT}.`)
}
bootstrap()
