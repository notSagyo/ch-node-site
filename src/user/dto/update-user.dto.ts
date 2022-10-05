import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: number;
  name?: string;
  lastName?: string;
  age?: number;
  avatar?: string;
  isAdmin?: boolean;
}
