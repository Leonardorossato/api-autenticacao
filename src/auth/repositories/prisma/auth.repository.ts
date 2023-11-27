import { Injectable } from '@nestjs/common';
import { AuthRepositoryInterface, User } from '../auth.repository.interface';
import { PrismaClient } from '@prisma/client';
import { Result } from 'src/core/application/result';
import { UserMapper } from 'src/auth/mappers/user.mapper';
import { NotFoundException } from 'src/core/exceptions';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
  private readonly authRepository = new PrismaClient().user;

  async create(data: User): Promise<Result<User>> {
    const newUser = await this.authRepository.create({ data: data });
    const user = UserMapper.toDomain(newUser);
    return Result.ok<User>(user.getPropsCopy());
  }
  async findByEmail(email: string): Promise<Result<User>> {
    const user = await this.authRepository.findUnique({
      where: { email: email },
    });
    if (!user) {
      return Result.fail<User>(new NotFoundException('User not found'));
    }
    return Result.ok<User>(user);
  }
  async findByDocument(document: string): Promise<User> {
    const user = await this.authRepository.findUnique({
      where: { document: document },
    });
    if (!user) return null;
    return user;
  }
  async update(id: string, data: User): Promise<Result<User>> {
    const user = await this.authRepository.update({ where: { id: id }, data });
    return Result.ok(user);
  }
  async findById(id: string): Promise<Result<User>> {
    const user = await this.authRepository.findUnique({ where: { id: id } });
    return Result.ok(user);
  }
}
