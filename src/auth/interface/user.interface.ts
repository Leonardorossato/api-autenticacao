export interface User {
  id: string;
  firstName: string;
  lastName: string;
  cellphone: string;
  email: string;
  password: string;
}

export interface RefreshToken extends User {
  refreshToken?: string;
}
