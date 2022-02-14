import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      //forRoutes: [],
      pinoHttp: {
        formatters: {
          level(level) {
            return { level };
          },
        },
        // level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  translateTime: true,
                  colorize: true,
                  ignore: 'pid,hostname',
                  messageFormat: (log, messageKey) => {
                    if ('req' in log) {
                      return `[${log.context}] ${log[messageKey]} ${log.req.url}`;
                    }
                    return `[${log.context}] ${log[messageKey]}`;
                  },
                },
              }
            : undefined,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
