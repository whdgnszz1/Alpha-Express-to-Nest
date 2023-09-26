import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { SignInDTO } from 'src/users/dto/user-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  signIn = async (signInDTO: SignInDTO) => {
    const { email, password } = signInDTO;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const isPasswordValidated: any = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, name: user.name, sub: user.userId };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '15d',
    });

    await this.usersRepository.saveRefreshToken(email, refreshToken);

    return {
      data: {
        email: user.email,
        name: user.name,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  };

  logout = async (email: string) => {
    await this.usersRepository.invalidateRefreshToken(email);
  };

  createAccessToken = async (email: string) => {
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    const payload = { email: user.email, name: user.name, sub: user.userId };
    return this.jwtService.sign(payload, {
      expiresIn: '1h',
    });
  };
}
