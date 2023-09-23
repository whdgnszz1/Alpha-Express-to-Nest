import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UndefinedToNullInterceptor } from './common/interceptors/undefinedToNullI.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new UndefinedToNullInterceptor());
  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}
bootstrap();
