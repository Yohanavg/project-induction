import { Types } from 'mongoose';

export interface Stats {
  life: number;
  attack: number;
  defense: number;
  speed: number;
  createdAt?: Date;
  updatedAt?: Date;
}