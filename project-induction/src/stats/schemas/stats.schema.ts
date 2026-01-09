import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


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
