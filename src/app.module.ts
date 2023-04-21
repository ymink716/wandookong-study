import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingModule } from './logging/logging.module';
import * as winston from 'winston';
import {
  utilities as nestWinstonMooduleUtilities,
  WinstonModule,
} from 'nest-winston';
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
