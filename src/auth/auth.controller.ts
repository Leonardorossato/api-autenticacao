import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './guards/public.guard';

@Controller('auth')
@ApiTags('Autentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  async login(@Body() dto: LoginAuthDto) {
    return await this.authService.login(dto);
  }

  @Post('/register')
  @Public()
  async register(@Body() dto: RegisterAuthDto) {
    return await this.authService.register(dto);
  }
}
