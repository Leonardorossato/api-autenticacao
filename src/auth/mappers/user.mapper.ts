import { UserDomain } from '../domain/user.domain';

export class UserMapper {
  static toDomain(user: UserDomainProps): UserDomain {
    return UserDomain.load(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        cellphone: user.cellphone,
        document: user.document,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      },
      user.id,
    );
  }
  static toPersistence(user: UserDomain): UserDomainProps {
    const {
      firstName,
      lastName,
      cellphone,
      document,
      email,
      password,
      isAdmin,
    } = user.getPropsCopy();
    return {
      firstName,
      lastName,
      cellphone,
      document,
      email,
      password,
      isAdmin,
    };
  }
}

export interface UserDomainProps {
  id?: string;
  firstName: string;
  lastName: string;
  cellphone: string;
  document: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
