import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login() {
    return await this.authService.login();
  }

  @Post('/register')
  async register() {
    return await this.authService.register();
  }
}
