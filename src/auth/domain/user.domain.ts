import { randomUUID } from 'crypto';
import { AggregateID, Entity } from 'src/core/domain/entity.base';

export class UserDomain extends Entity<UserDomainInterface> {
  protected _id: AggregateID;

  static create(props: UserDomainInterface) {
    delete props.isAdmin;
    return new UserDomain({ props, id: randomUUID() });
  }

  static load(
    props: UserDomainInterface & { createdAt?: Date; updatedAt?: Date },
    id?: AggregateID,
  ) {
    const { createdAt, updatedAt, ...rest } = props;
    return new UserDomain({ props: rest, id, createdAt, updatedAt });
  }

  public validate(): void {
    if (!this.props.firstName) {
      throw new Error('First name is required');
    }
    if (!this.props.lastName) {
      throw new Error('Last name is required');
    }
    if (!this.props.cellphone) {
      throw new Error('Cellphone is required');
    }
    if (!this.props.document) {
      throw new Error('Document is required');
    }
    if (!this.props.email) {
      throw new Error('Email is required');
    }
    if (!this.props.password) {
      throw new Error('Password is required');
    }
  }
}

export interface UserDomainInterface {
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
