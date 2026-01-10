import { Types } from 'mongoose';
import { Stats } from 'src/stats/interfaces/stats.interface';

export interface PokemonInterface {
  name: string;
  type: string;
  stats: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date,
}
