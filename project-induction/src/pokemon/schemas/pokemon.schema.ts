import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema({ collection: 'pokemons', timestamps: true })
export class Pokemon {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Stats',
    required: true,
  })
  stats: Types.ObjectId;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
