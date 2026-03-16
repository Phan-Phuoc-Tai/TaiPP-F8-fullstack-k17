export interface User {
  fullName: string;
  email: string;
  password?: string;
}

declare module "express" {
  export interface Request {
    user?: User;
  }
}
