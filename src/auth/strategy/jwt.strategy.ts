import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { LoginAuthDto } from '../dto/login-auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Use a mesma chave secreta que você usou no JwtModule
    });
  }

  async validate(dto: LoginAuthDto) {
    const user = await this.authService.findUserByEmail(dto.email);

    if (!user) {
      return false;
    }

    return user;
  }
}
