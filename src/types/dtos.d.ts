export interface ProductDto {
  description: string;
  thumbnail: string;
  price: number;
  name: string;
  id: string;
}

export interface ProductDtoOptional {
  description?: string;
  thumbnail?: string;
  price: number;
  name: string;
  id: string;
}

export interface CartProductDto {
  timestamp: number;
  quantity: number;
  code: string;
  id: string;
}

export interface CartDtoOptional {
  id: string;
  timestamp?: number;
  products?: CartProductDto[];
}

export interface CartDto {
  id: string;
  timestamp: number;
  products: CartProductDto[];
}

export interface UserDto {
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

export interface MessageDto {
  content: string;
  author: UserDto;
  time: number;
  id: string;
}
