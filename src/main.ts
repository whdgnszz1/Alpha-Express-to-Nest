import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { UndefinedToNullInterceptor } from './common/interceptors/undefinedToNullI.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new UndefinedToNullInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
