import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { UndefinedToNullInterceptor } from './common/interceptors/undefinedToNullI.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Alpha')
    .setDescription('Alpha API doc')
    .setVersion('1.0')
    .addTag('alpha')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalInterceptors(
    new UndefinedToNullInterceptor(),
    new SuccessInterceptor(),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
