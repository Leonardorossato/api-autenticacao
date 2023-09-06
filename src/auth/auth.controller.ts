import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './guards/public.guard';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('Autentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/logout')
  @Public()
  async logout(@Req() req: Request, @Res() res: Response) {
    return await this.authService.logOut(req, res);
  }

  @Post('/login')
  @Public()
  async login(@Body() dto: LoginAuthDto, @Res() res: Response) {
    return await this.authService.login(dto, res);
  }

  @Post('/register')
  @Public()
  async register(@Body() dto: RegisterAuthDto) {
    return await this.authService.register(dto);
  }
}
