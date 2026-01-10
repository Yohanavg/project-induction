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
  ) {}

  async create(
    userDto: CreateUserDto,
  ): Promise<Omit<UserInterface, 'password'>> {
    const createdUser = new this.userModel(userDto);
    const savedUser = await createdUser.save();

    const { password, ...userWithoutPassword } = savedUser.toObject();
    return userWithoutPassword;
  }

  async findAll(): Promise<Omit<UserInterface, 'password'>[]> {
    return this.userModel.find().select('-password').lean().exec();
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<Omit<UserInterface, 'password'> | null> {
    const user = await this.userModel
      .findById(id)
      .select('-password')
      .lean()
      .exec();
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<UserInterface, 'password'> | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .lean()
      .exec();
    return user;
  }

  async remove(id: string): Promise<Omit<UserInterface, 'password'> | null> {
    const user = await this.userModel.findByIdAndDelete(id).lean().exec();
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
