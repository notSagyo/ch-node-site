export interface iProduct {
  description?: string;
  thumbnail?: string;
  price: number;
  name: string;
  id: string;
}

export interface iCartProduct {
  timestamp: number;
  quantity: number;
  code: string;
  id: string;
}

export interface iCart {
  products: iCartProduct[];
  timestamp: number;
  id: string;
}

export interface iUser {
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

export interface iMessage {
  content: string;
  author: iUser;
  time: number;
  id: string;
}
