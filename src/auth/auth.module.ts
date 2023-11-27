import { Module } from '@nestjs/common';
import { LoginUserController } from './usecases/login-user/login-user.controller';
import { RegisterUserController } from './usecases/register-user/register-user.controller';
import { LoginUserUseCase } from './usecases/login-user/login-user.usecase';
import { RegisterUserUseCase } from './usecases/register-user/register-user.usecase';
import { AuthRepository } from './repositories/prisma/auth.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [LoginUserController, RegisterUserController],
  providers: [
    LoginUserUseCase,
    RegisterUserUseCase,
    {
      provide: 'auth_repository',
      useClass: AuthRepository,
    },
    {
      provide: 'jwt-service',
      useFactory: () => {
        return new JwtService({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        });
      },
    },
  ],
})
export class AuthModule {}
