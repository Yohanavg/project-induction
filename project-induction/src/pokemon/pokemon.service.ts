import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

import { PokemonRepositoryService } from './pokemonRepository.service';
import { StatsRepository } from 'src/stats/stats.repository';

@Injectable()
export class PokemonService {
  
  constructor(
    private readonly pokemonRepository: PokemonRepositoryService,
    private readonly statsRepository: StatsRepository
  ) {}


  async findAll() {
    return await this.pokemonRepository.findAll();
  }

  async create(createPokemonDto: CreatePokemonDto) {
  const stats = await this.statsRepository.create(
    createPokemonDto.stats,  //Crear stats primero
  );
  const pokemon = {
    name: createPokemonDto.name.toLowerCase(),
    type: createPokemonDto.type.toUpperCase(),
    stats: stats._id,  //Crear pokemon con referencia de stats
  };
  return await this.pokemonRepository.create(pokemon);
}


  async findOne(name: string) {
    return await this.pokemonRepository.findOne(name); //Cambia findOne para buscar por nombre en la BD
  }

 
  async remove(name: string) {
    return await this.pokemonRepository.remove(name);  //Cambia remove para borrar de la BD
  }
}