import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() body: {id:string, name: string}) {
        return this.authService.generateToken({sub: body.id, email: body.name, name: body.name});
    }
}
