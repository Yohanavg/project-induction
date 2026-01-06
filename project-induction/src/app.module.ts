import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://aleicer_vesga:jCCGGQb0uGKp26dP@iudigitaldb.w7v4d.mongodb.net/film-iudigital'),
    PokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
