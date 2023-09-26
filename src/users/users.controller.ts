import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SignInDTO, SignUpDTO } from './dto/user-auth.dto';

@Controller('/api')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDTO) {
    return this.usersService.signUp(signUpDto);
  }

  @Post('/login')
  async signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt-logout'))
  async logout(@Request() req) {
    await this.authService.logout(req.user.email);
    return { message: '로그아웃 되었습니다.' };
  }

  @Post('/refreshToken')
  @UseGuards(AuthGuard('jwt-refresh-token'))
  async refreshToken(@Request() req) {
    const newAccessToken = await this.authService.createAccessToken(
      req.user.email,
    );
    return {
      data: {
        email: req.user.email,
        name: req.user.name,
        accessToken: newAccessToken,
      },
    };
  }
}
