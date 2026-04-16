declare module "express-session" {
  export interface SessionData {
    user: {
      id: number;
      email: string;
      googleId: string;
      name: string;
      verified_email: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    token: string;
  }
}
