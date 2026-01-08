import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    login(user: {id:string, name: string}) {
        const payLoad = {
        name: user.name,
    };
    return{
      accessToken: this.jwtService.sign(payLoad)
    };
  }
}

