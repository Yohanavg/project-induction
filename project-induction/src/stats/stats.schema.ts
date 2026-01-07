import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatsDocument = Stats & Document;

@Schema({ timestamps: true })
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

export const StatsSchema = SchemaFactory.createForClass(Stats);
