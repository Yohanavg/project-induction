import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  generateToken(user: { sub: string, email: string, name: string }) {
    const payLoad = {
      sub: user.sub,
      email: user.email,
      name: user.name,
    };
    return {
      accessToken: this.jwtService.sign(payLoad)
    };
  }
}

