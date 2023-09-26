import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/common/entities/user.entity';

export class SignUpDTO extends PickType(UserEntity, [
  'email',
  'name',
  'password',
]) {}

export class SignInDTO extends PickType(UserEntity, ['email', 'password']) {}
