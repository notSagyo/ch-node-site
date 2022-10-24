export interface ProductDto {
  description: string;
  thumbnail: string;
  price: number;
  name: string;
  id: string;
}

export interface ProductDtoPayload {
  id?: string;
  thumbnail?: string;
  description?: string;
  price: number;
  name: string;
}

export interface CartProductDto {
  timestamp: number;
  quantity: number;
  code: string;
  id: string;
}

export interface CartDto {
  products: CartProductDto[];
  timestamp: number;
  id: string;
}

export interface CartDtoPayload {
  id?: string;
  timestamp?: number;
  products?: CartProductDto[];
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

export interface UserDtoPayload {
  id?: string;
  avatar?: string;
  isAdmin?: boolean;
  lastName: string;
  username: string;
  password: string;
  phone: number;
  email: string;
  name: string;
  age: number;
}

// ?TODO: Replace author for real user
// * Keeping commented code to make author real user
export interface MessageDto {
  content: string;
  author: string;
  time: number;
  id: string;
}

export interface MessageDtoPayload {
  id?: string;
  time?: number;
  content: string;
  author: string;
}

// export interface MessageDto {
//   content: string;
//   author: UserDto;
//   time: number;
//   id: string;
// }
