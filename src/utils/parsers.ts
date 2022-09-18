import { IParser } from '../types/types';
import { UserDto, MessageDto, ProductDto, CartProductDto } from '../types/dtos';
import { validateEmail } from './utils';
import { validate, v4 } from 'uuid';
import { logger } from './logger';

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

export const parseMessage: IParser<MessageDto> = (msg) => {
  if (msg == null) return null;
  const id = typeof msg?.id === 'string' ? msg.id : v4();
  const author = parseUser(msg?.author as Record<string, unknown>);
  const time =
    msg?.time && !isNaN(Number(msg?.time)) ? Number(msg.time) : Date.now();
  const content =
    typeof msg?.content === 'string' && msg?.content.length > 0
      ? msg.content
      : '';

  if (author == null) {
    logger.error('Invalid message author');
    return null;
  }

  return { id, time, author, content };
};

export const parseProduct: IParser<ProductDto> = (prod) => {
  const placeholder = 'https://via.placeholder.com/256';

  const isValidName = typeof prod?.name === 'string' && prod.name.length > 0;
  const isValidId = typeof prod?.id === 'string' && validate(prod.id);
  const isValidDescription = typeof prod?.description === 'string';
  const isValidPrice =
    prod?.price && !isNaN(Number(prod?.price)) && Number(prod?.price) > 0;
  const isValidThumbnail =
    typeof prod?.thumbnail === 'string' && prod?.thumbnail.length > 0;

  const description = isValidDescription
    ? (prod.description as string)
    : undefined;
  const thumbnail = isValidThumbnail ? (prod.thumbnail as string) : placeholder;
  const price = isValidPrice ? Number(prod.price) : null;
  const name = isValidName ? (prod.name as string) : null;
  const id = isValidId ? (prod.id as string) : v4();

  if (name != null && price != null)
    return { id, name, price, thumbnail, description };
  return null;
};

export const parseCartProduct: IParser<CartProductDto> = (prod) => {
  const isValidCode = typeof prod?.code === 'string' && prod.code.length > 0;
  const isValidId = typeof prod?.id === 'string' && validate(prod.id);
  const isValidTimestamp =
    typeof prod?.timestamp === 'number' && prod.timestamp > 0;
  const isValidQuantity =
    typeof prod?.quantity === 'number' && prod.quantity > 0;

  if (!isValidId) return null;

  const quantity = isValidQuantity ? (prod.quantity as number) : 1;
  const timestamp = isValidTimestamp ? (prod.timestamp as number) : Date.now();
  const code = isValidCode ? (prod.code as string) : '-1';
  const id = prod.id as string;

  return { id, code, quantity, timestamp };
};
