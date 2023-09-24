import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import {
  JwtStrategy,
  LogoutJwtStrategy,
  RefreshTokenStrategy,
} from './jwt/jwt.startegy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
    LogoutJwtStrategy,
  ],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
