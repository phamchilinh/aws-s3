import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import CloudWatchTransport from 'winston-cloudwatch';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  // app.useLogger(
  //   WinstonModule.createLogger({
  //     format: winston.format.uncolorize(),
  //     transports: [
  //       new winston.transports.Console({
  //         format: winston.format.combine(
  //           winston.format.timestamp(),
  //           winston.format.ms(),
  //           nestWinstonModuleUtilities.format.nestLike(),
  //         ),
  //       }),
  //       new CloudWatchTransport({
  //         name: 'Cloudwatch Logs',
  //         logGroupName: configService.get('CLOUDWATCH_GROUP_NAME'),
  //         logStreamName: configService.get('CLOUDWATCH_STREAM_NAME'),
  //         awsAccessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
  //         awsSecretKey: configService.get('AWS_SECRET_ACCESS_KEY'),
  //         awsRegion: configService.get('CLOUDWATCH_AWS_REGION'),
  //         messageFormatter: function (item) {
  //           return (
  //             item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
  //           );
  //         },
  //       }),
  //     ],
  //   }),
  // );
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
