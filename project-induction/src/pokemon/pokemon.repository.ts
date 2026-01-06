import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema({ collection: 'pokemons' })
export class Stats {
  @Prop({ required: true })
  life: number;

  @Prop({ required: true })
  attack: number;

  @Prop({ required: true })
  defense: number;

  @Prop({ required: true })
  speed: number;
}

@Schema()
export class Pokemon {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Stats, required: true })
  stats: Stats;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
