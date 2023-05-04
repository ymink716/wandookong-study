import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/all-exception.filter';
import { LoggerModule } from './logging/logger.module';
import * as winston from 'winston';
import {
  utilities as nestWinstonMooduleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? './env/.production.env'
          : process.env.NODE_ENV === 'stage'
          ? './env/.stage.env'
          : './env/.development.env',
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonMooduleUtilities.format.nestLike('wandookong', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: 'wandookong',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DATABASE_SYNCHRONIZE') === 'true',
      }),
    }),
    LoggerModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
