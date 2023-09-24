import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('jwt-refresh-token') {}

@Injectable()
export class LogoutAuthGuard extends AuthGuard('jwt-logout') {}
