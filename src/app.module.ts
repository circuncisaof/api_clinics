import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entitie';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env.development.local',
      isGlobal: true,
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mari0001',
      database: 'postgres',
      entities: [UserEntity],
      synchronize: true,
      logging: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
