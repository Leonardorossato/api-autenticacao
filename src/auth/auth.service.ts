import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RefreshToken, User } from './interface/user.interface';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
  private readonly users: RefreshToken[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginAuthDto, res: Response) {
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
      } else {
        const refreshToken = this.generateRefreshToken(
          user.id,
          user.email,
          user.password,
        );

        user.refreshToken = refreshToken;

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });

        const token = this.generateToken(user.id, user.email, user.password);

        return res.status(200).json({ token: token });
      }
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

  async logOut(req: Request, res: Response) {
    try {
      const cookie = req.cookies;
      if (!cookie?.refreshToken) {
        throw new HttpException(
          'No refresh token in cookie',
          HttpStatus.BAD_REQUEST,
        );
      }

      const refreshToken = cookie.refreshToken;
      const user = this.users.find(
        (user) => user.refreshToken === refreshToken,
      );
      if (user) {
        throw new HttpException(
          'No refresh token present in user',
          HttpStatus.BAD_REQUEST,
        );
      }
      res.clearCookie('refreshToken', refreshToken);
      return res.status(200).json({ message: 'Logout successfully.' });
    } catch (error) {
      throw new HttpException(
        'Error to clear refresh Token',
        HttpStatus.BAD_REQUEST,
      );
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

  private generateRefreshToken(id: string, email: string, password: string) {
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
