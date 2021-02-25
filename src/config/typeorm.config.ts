import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'alan',
  database: 'taskmanagementudemycourse',
  autoLoadEntities: true,
  synchronize: true, // not recommended for production
}
