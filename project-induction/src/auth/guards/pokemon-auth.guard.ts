import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class PokemonAuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) return false;
    const validateSignedToken = this.authService.validateSignedToken(token);

    if (!validateSignedToken) {
      throw new UnauthorizedException('Token inválido');
    }

    // return true;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
