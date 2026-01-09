import { Types } from 'mongoose';

export interface Stats {
  _id: Types.ObjectId;
  life: number;
  attack: number;
  defense: number;
  speed: number;
  createdAt?: Date;
  updatedAt?: Date;
}
