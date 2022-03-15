import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';
@Module({
  imports: [
    // 配置数据库
    TypeOrmModule.forRoot({
      port: 3306,
      type: 'mysql',
      username: configuration().db.mysql.username,
      host: configuration().db.mysql.host,
      charset: configuration().db.mysql.charset,
      password: configuration().db.mysql.password,
      database: configuration().db.mysql.database,
      synchronize: true,
      autoLoadEntities: true,
    }),
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
