import { PrismaModule } from './prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.develpoment' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
