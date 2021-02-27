import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config'

const {
  type,
  port,
  database,
  host,
  username,
  password,
  autoLoadEntities,
  synchronize,
} = config.get('db')

export const typeOrmConfig: TypeOrmModuleOptions = {
  type,
  port: process.env.RDS_PORT || port,
  database: process.env.RDS_DATABASE || database,
  host: process.env.RDS_HOSTNAME || host,
  username: process.env.RDS_USERNAME || username,
  password: process.env.RDS_PASSWORD || password,
  autoLoadEntities,
  synchronize: process.env.TYPEORM_SYNC || synchronize, // should be set to false in production
}
