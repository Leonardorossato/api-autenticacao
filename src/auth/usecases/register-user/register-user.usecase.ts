import { Injectable, Inject } from '@nestjs/common';
import { Result } from 'src/core/application/result';
import { ForbiddenException } from 'src/core/exceptions';
import { RegisterDto } from './register-user.dto';

import * as bcrypt from 'bcrypt';
import { AuthRepositoryInterface, User } from 'src/auth/repositories/auth.repository.interface';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('auth_repository')
    private readonly authRepository: AuthRepositoryInterface,
  ) {}

  async register(data: RegisterDto): Promise<Result<User>> {
    const userExists = await this.authRepository.findByDocument(data.document);

    if (userExists) {
      return Result.fail(new ForbiddenException('User existent'));
    }

    const email = await this.authRepository.findByEmail(data.email);
    if (email) {
      return Result.fail(new ForbiddenException('Email existent'));
    }

    const passwordHash = bcrypt.hashSync(data.password, 10);

    const user = await this.authRepository.create({
      ...data,
      password: passwordHash,
    });

    if (user.isFailure) {
      return Result.fail(new ForbiddenException('User existent'));
    }

    return user;
  }
}
