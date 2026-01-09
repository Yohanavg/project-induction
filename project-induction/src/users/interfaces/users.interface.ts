import { Types } from 'mongoose';

export interface UserInterface {
    _id?: Types.ObjectId;
    name: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
