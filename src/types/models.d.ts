export interface IProductDto {
  description?: string;
  thumbnail?: string;
  price: number;
  name: string;
  id: string;
}

export interface ICartProductDto {
  timestamp: number;
  quantity: number;
  code: string;
  id: string;
}

export interface ICartDto {
  products: ICartProductDto[];
  timestamp: number;
  id: string;
}

export interface IUserDto {
  lastName: string;
  username: string;
  password: string;
  isAdmin: boolean;
  avatar: string;
  phone: number;
  email: string;
  name: string;
  age: number;
  id: string;
}

export interface IMessageDto {
  content: string;
  author: IUserDto;
  time: number;
  id: string;
}
