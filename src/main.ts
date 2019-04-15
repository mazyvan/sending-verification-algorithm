import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from './config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('PNV (Phone Numbers Verification) API Docs')
    // tslint:disable-next-line:quotemark
    .setDescription("A simple API to verify users' phone number")
    .setVersion('0.0.0')
    .setContactEmail('mazyvan@hotmail.com')
    .setSchemes(configService.getEnv === 'local' ? 'http' : 'https')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/developers', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(configService.getPort);
  Logger.log('\n\n', 'Separator');
}
bootstrap();
