import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { UserInterface } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserInterface>,
    ) { }

    // Crear usuario (ya llega con password hasheado desde el servicio)
    async create(userDto: CreateUserDto): Promise<Omit<UserInterface, 'password'>> {
        const createdUser = new this.userModel(userDto);
        const savedUser = await createdUser.save();

        // Retornar sin password
        const { password, ...userWithoutPassword } = savedUser.toObject();
        return userWithoutPassword;
    }

    // Buscar todos los usuarios (sin password)
    async findAll(): Promise<Omit<UserInterface, 'password'>[]> {
        return this.userModel.find().select('-password').lean().exec();
    }

    // Buscar por email (incluye password para login)
    async findByEmail(email: string): Promise<UserInterface | null> {
        return this.userModel.findOne({ email }).exec();
    }

    // Buscar por id (sin password)
    async findById(id: string): Promise<Omit<UserInterface, 'password'> | null> {
        const user = await this.userModel.findById(id).select('-password').lean().exec();
        return user;
    }

    // Actualizar usuario (sin permitir cambiar password por aquí)
    async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<UserInterface, 'password'> | null> {
        const user = await this.userModel
         .findByIdAndUpdate(id, updateUserDto, { new: true }).select('-password').lean().exec();
        return user;
    }

    // Eliminar usuario
    async remove(id: string): Promise<Omit<UserInterface, 'password'> | null> {
        const user = await this.userModel.findByIdAndDelete(id).lean().exec();
        if (!user) return null;
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
