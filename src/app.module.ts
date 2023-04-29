import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingModule } from './logging/logging.module';
import * as winston from 'winston';
import {
  utilities as nestWinstonMooduleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
@Module({
  imports: [
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
    LoggingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
