import { Injectable } from '@nestjs/common';
import { SignUpDTO } from './dto/user-auth.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  signUp = async (signUpDto: SignUpDTO) => {
    const { email, name, password } = signUpDto;
    const user = await this.usersRepository.registerUser(email, name, password);
    return user;
  };
}
