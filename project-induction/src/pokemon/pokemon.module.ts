import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonRepositoryService } from './pokemonRepository.service';
import { Pokemon, PokemonSchema } from './schemas/pokemon.schema';
import { StatsModule } from 'src/stats/stats.module';
import { PokemonAuthModule } from '../pokemon-auth/pokemon-auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
    StatsModule,
    PokemonAuthModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepositoryService],
})
export class PokemonModule {}
