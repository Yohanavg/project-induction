import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './user.repository.service';
import { UserInterface } from './interfaces/users.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly authService: AuthService,
    ) { }

    async findAll(): Promise<Omit<UserInterface, 'password'>[]> {
  return this.usersRepository.findAll(); 
}

    // Obtener usuario por ID (sin contraseña)
    async getUser(id: string): Promise<Omit<UserInterface, 'password'>> {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    // Crear usuario
    async createUser(createDto: CreateUserDto): Promise<Omit<UserInterface, 'password'>> {
        const hashedPassword = await bcrypt.hash(createDto.password, 10);
        const user = await this.usersRepository.create({ ...createDto, password: hashedPassword });
        return user;
    }

    // Actualizar nombre y apellido
    async updateUser(id: string, updateDto: UpdateUserDto): Promise<Omit<UserInterface, 'password'>> {
        const user = await this.usersRepository.update(id, updateDto);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    // Eliminar usuario
    async deleteUser(id: string): Promise<void> {
        const deleted = await this.usersRepository.remove(id);
        if (!deleted) throw new NotFoundException('User not found');
    }

    // Login y generar token
    async login(dto: LoginUserDto): Promise<{ accessToken: string }> {
        const user = await this.usersRepository.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid email or password');

        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) throw new UnauthorizedException('Invalid email or password');

        return this.authService.generateToken({ sub: user._id?.toString() || '', email: user.email, name: user.name });
    }
}
