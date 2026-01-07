import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonRepositoryService } from './pokemonRepository.service';
import { Pokemon, PokemonSchema } from './schemas/pokemon.schema';
import { StatsModule } from 'src/stats/stats.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pokemon.name, schema: PokemonSchema },
    ]),
    StatsModule, 
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepositoryService],
})
export class PokemonModule {}

