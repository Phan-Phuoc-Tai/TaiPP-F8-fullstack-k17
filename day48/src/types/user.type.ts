export type UserQuery = {
  status: string;
  s: string;
  page: number;
  limit: number;
  select: string;
};

export type UserResponse = {
  name: string;
  id: number;
  email: string;
  status: boolean;
  created_at: Date | null;
  updated_at: Date | null;
};
