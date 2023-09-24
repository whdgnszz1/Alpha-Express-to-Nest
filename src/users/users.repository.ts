import { PrismaService } from './../prisma.service';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  registerUser = async (email: string, name: string, password: string) => {
    const existUser = await this.findUserByEmail(email);
    if (existUser) {
      throw new HttpException('이미 존재하는 이메일입니다.', 412);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.users.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return newUser;
  };

  findUserByEmail = async (email: string) => {
    const existUser = await this.prisma.users.findUnique({
      where: { email },
    });
    return existUser;
  };

  findUserByIdWithoutPassword = async (userId: number) => {
    try {
      const user = await this.prisma.users.findUnique({
        where: { userId },
        select: { userId: true, email: true, name: true, refreshToken: true },
      });
      return user;
    } catch (error) {
      throw new HttpException('유저를 찾을 수 없습니다.', 404);
    }
  };

  saveRefreshToken = async (email: string, refreshToken: string) => {
    try {
      const user = await this.prisma.users.update({
        where: { email: email },
        data: { refreshToken: refreshToken },
      });
      return user;
    } catch (error) {
      console.error('DB에서 오류가 발생했습니다.', error);
      throw error;
    }
  };

  invalidateRefreshToken = async (email: string) => {
    try {
      await this.prisma.users.update({
        where: { email: email },
        data: { refreshToken: null },
      });
    } catch (error) {
      console.error('DB에서 오류가 발생했습니다.', error);
      throw error;
    }
  };
}
