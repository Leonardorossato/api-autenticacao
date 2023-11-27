import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './login-user.dto';
import { Result } from 'src/core/application/result';
import { ForbiddenException } from 'src/core/exceptions';
import * as bcrypt from 'bcrypt';
import { AuthRepositoryInterface } from 'src/auth/repositories/auth.repository.interface';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('auth_repository')
    private readonly authRepository: AuthRepositoryInterface,
    @Inject('jwt-service') private readonly jwtService: JwtService,
  ) {}

  async login(
    data: LoginUserDto,
  ): Promise<Result<{ token: string; userId: string }>> {
    const { document, password } = data;

    const user = await this.authRepository.findByDocument(document);

    if (!user) {
      return Result.fail(new ForbiddenException('User or password incorrect'));
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return Result.fail(new ForbiddenException('User or password incorrect'));
    }

    const token = this.jwtService.sign({ sub: user.id });

    return Result.ok({ token, userId: user.id });
  }
}
