import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.ACCESS_SECRET_KEY,
    });
  }

  async validate(payload: Payload) {
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (payload.exp < currentTimestamp) {
        throw new UnauthorizedException('jwt Expired');
      }

      const user = await this.usersRepository.findUserByIdWithoutPassword(
        payload.sub,
      );
      if (!user) {
        throw new UnauthorizedException('접근 오류');
      }

      return user;
    } catch (error: any) {
      throw error;
    }
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_SECRET_KEY,
    });
  }

  async validate(payload: Payload) {
    const user = await this.usersRepository.findUserByIdWithoutPassword(
      payload.sub,
    );

    if (user && user.refreshToken) {
      return user;
    } else {
      throw new UnauthorizedException('Refresh token is invalid');
    }
  }
}

@Injectable()
export class LogoutJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-logout',
) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.ACCESS_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.usersRepository.findUserByIdWithoutPassword(
      payload.sub,
    );
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 사용자입니다.');
    }
    return user;
  }
}
