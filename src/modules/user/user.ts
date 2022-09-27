import { v4, validate } from 'uuid';
import { UserDto, UserDtoPayload } from '../../types/dtos';
import { IParser } from '../../types/types';
import { logger } from '../../utils/logger';
import { validateEmail } from '../../utils/utils';

export default class User implements UserDto {
  email: string;
  username: string;
  password: string;
  name: string;
  lastName: string;
  phone: number;
  age: number;
  avatar: string;
  isAdmin: boolean;
  id: string;

  constructor(
    email: string,
    username: string,
    password: string,
    name: string,
    lastName: string,
    phone: number,
    age: number,
    avatar: string,
    isAdmin: boolean,
    id: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.phone = phone;
    this.age = age;
    this.avatar = avatar;
    this.isAdmin = isAdmin;
    this.id = id;
  }

  static fromDto(dto: UserDtoPayload): User {
    const parsedUser = parseUser(dto);
    if (parsedUser == null) throw new Error('User: error parsing message');
    return new User(
      parsedUser.email,
      parsedUser.username,
      parsedUser.password,
      parsedUser.name,
      parsedUser.lastName,
      parsedUser.phone,
      parsedUser.age,
      parsedUser.avatar,
      parsedUser.isAdmin,
      parsedUser.id
    );
  }

  toDto(): UserDto {
    const {
      age,
      avatar,
      email,
      id,
      isAdmin,
      lastName,
      name,
      password,
      phone,
      username,
    } = this;
    return {
      age,
      avatar,
      email,
      id,
      isAdmin,
      lastName,
      name,
      password,
      phone,
      username,
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
