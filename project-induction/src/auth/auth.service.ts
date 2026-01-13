import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: { _id: string; email: string; name: string }) {
    const payLoad = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    return {
      accessToken: this.jwtService.sign(payLoad),
    };
  }

  validateSignedToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
