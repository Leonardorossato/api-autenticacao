import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcryptjs';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginAuthDto) {
    try {
      const { email, password } = dto;
      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new HttpException(
          'Password doesent match',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const token = await this.generateToken(
        user.id,
        user.email,
        user.password,
      );

      return {
        token: token,
      };
    } catch (error) {
      throw new HttpException('Error generating token', HttpStatus.BAD_REQUEST);
    }
  }

  async register(dto: RegisterAuthDto) {
    try {
      const { firstName, lastName, cellphone, email, password } = dto;
      const user = await this.findUserByEmail(email);
      if (user) {
        throw new HttpException(
          'User already registered with this email',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: '',
        ...dto,
        password: hashPassword,
      };
      this.create(newUser);
      return newUser;
    } catch (error) {
      throw new HttpException('Wrong user credentials', HttpStatus.BAD_REQUEST);
    }
  }

  private create(dto: User) {
    const id = uuidv4();
    dto.id = id;
    this.users.push(dto);
  }

  private findUserByEmail(email: string) {
    return this.users.find((users) => users.email === email);
  }

  private generateToken(id: string, email: string, password: string) {
    const payload = {
      id,
      email,
      password,
    };

    if (!payload) {
      return null;
    }

    return this.jwtService.sign(payload);
  }
}
