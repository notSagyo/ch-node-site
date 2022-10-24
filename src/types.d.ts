import { UserDto } from './types/dtos';

// Express ===================================================================//
// Express session Declaration merging
declare module 'express-session' {
  interface SessionData {
    user: { [key: string]: unknown };
    isAdmin: boolean;
  }
}

declare module 'Express' {
  interface User {
    email: string;
    password: string;
  }
}

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserDto {}
  }
}
