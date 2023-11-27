import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Api Authentication Backend Nestjs Api')
    .setDescription('Api Authentication with NestJs, Swagger and Jwt')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.APP_PORT).then(() => {
    console.log(
      `Server is running on: http://localhost:${process.env.APP_PORT}/docs`,
    );
  });
}
void bootstrap();
