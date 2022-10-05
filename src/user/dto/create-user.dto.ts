export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  phone: number;
  name: string;
  lastName: string;
  age: number;
  id?: string;
  avatar?: string;
  isAdmin?: boolean;
}
