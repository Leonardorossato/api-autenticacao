import { Result } from 'src/core/application/result';

export interface AuthRepositoryInterface {
  create: (data: User) => Promise<Result<User>>;
  findByEmail: (email: string) => Promise<Result<User>>;
  findByDocument: (document: string) => Promise<User>;
  update: (id: string, data: User) => Promise<Result<User>>;
  findById: (id: string) => Promise<Result<User>>;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  cellphone: string;
  document: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
