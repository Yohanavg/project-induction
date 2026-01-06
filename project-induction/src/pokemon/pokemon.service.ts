import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

import { PokemonRepositoryService } from './pokemonRepository.service';

@Injectable()
export class PokemonService {
  
  // 1. El constructor está bien, pero necesitamos usar 'this.pokemonModel'
  constructor(
    private readonly pokemonRepository: PokemonRepositoryService
  ) {}

  // 2. Cambia findAll para que busque en la BD
  async findAll() {
    return await this.pokemonRepository.findAll();
  }

  // 3. Cambia create para que guarde en MongoDB
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    createPokemonDto.type = createPokemonDto.type.toLocaleUpperCase();
    const nuevoPokemon = await this.pokemonRepository.create(createPokemonDto);
    return nuevoPokemon;
  }

  // 4. Cambia findOne para buscar por nombre en la BD
  async findOne(name: string) {
    return await this.pokemonRepository.findOne(name);
  }

  // 5. Cambia remove para borrar de la BD
  async remove(name: string) {
    return await this.pokemonRepository.remove(name);
  }
}