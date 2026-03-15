export interface User {
  email: string;
  password?: string;
  fullName?: string;
}

declare module "express" {
  export interface Request {
    user?: User;
  }
}
