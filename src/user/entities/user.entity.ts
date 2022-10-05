import { v4, validate } from 'uuid';
import { UserDto, UserDtoPayload } from '../../types/dtos';
import { IParser } from '../../types/types';
import { logger } from '../../utils/logger';
import { validateEmail } from '../../utils/utils';

export default class User implements UserDto {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: number;
  name: string;
  lastName: string;
  age: number;
  avatar: string;
  isAdmin: boolean;

  constructor(
    id: string,
    username: string,
    password: string,
    email: string,
    phone: number,
    name: string,
    lastName: string,
    age: number,
    avatar: string,
    isAdmin: boolean,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.avatar = avatar;
    this.isAdmin = isAdmin;
  }

  static fromDto(dto: UserDtoPayload): User {
    const parsedUser = parseUser(dto);
    if (parsedUser == null) throw new Error('User: error parsing user');
    return new User(
      parsedUser.id,
      parsedUser.username,
      parsedUser.password,
      parsedUser.email,
      parsedUser.phone,
      parsedUser.name,
      parsedUser.lastName,
      parsedUser.age,
      parsedUser.avatar,
      parsedUser.isAdmin,
    );
  }

  toDto(): UserDto {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      avatar: this.avatar,
      isAdmin: this.isAdmin,
    };
  }
}

export const parseUser: IParser<UserDto> = (user) => {
  if (user == null) return null;

  const isValidPassword =
    typeof user?.password === 'string' && user.password.length > 1;
  const isValidName = typeof user?.name === 'string' && user.name.length > 1;
  const isValidId = typeof user?.id === 'string' && validate(user.id);
  const isValidRole = typeof user?.isAdmin === 'boolean';
  const isValidLastName =
    typeof user?.lastName === 'string' && user.lastName.length > 1;
  const isValidUsername =
    typeof user?.username === 'string' && user.username.length > 2;
  const isValidAvatar =
    typeof user?.avatar === 'string' && user.avatar.length > 0;
  const isValidEmail =
    typeof user?.email === 'string' && validateEmail(user.email);
  const isValidAge =
    user?.age && !isNaN(Number(user?.age)) && Number(user?.age) > 0;
  const phoneNoSpaces = user?.phone
    ? parseInt(String(user?.phone).replaceAll(' ', ''))
    : null;

  if (!isValidAge) logger.error('Invalid user age:', user?.age);
  if (!isValidName) logger.error('Invalid user name:', user?.name);
  if (!isValidEmail) logger.error('Invalid user email:', user?.email);
  if (!isValidUsername) logger.error('Invalid user username:', user?.username);
  if (!isValidLastName) logger.error('Invalid user last name:', user?.lastName);
  if (!isValidPassword) logger.error('Invalid user password');
  if (!phoneNoSpaces) logger.error('Invalid user phone:', phoneNoSpaces);

  const isValid =
    isValidUsername &&
    isValidPassword &&
    isValidLastName &&
    isValidEmail &&
    isValidName &&
    isValidAge &&
    phoneNoSpaces;
  if (!isValid) return null;

  // Non-required fields
  const id = isValidId ? (user.id as string) : v4();
  const avatar = isValidAvatar ? (user.avatar as string) : '';
  const isAdmin = isValidRole ? (user.isAdmin as boolean) : false;

  return {
    id,
    avatar,
    isAdmin,
    phone: phoneNoSpaces,
    age: user.age as number,
    name: user.name as string,
    email: user.email as string,
    lastName: user.lastName as string,
    username: user.username as string,
    password: user.password as string,
  };
};
