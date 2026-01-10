import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonRepositoryService } from './pokemonRepository.service';
import { StatsRepository } from 'src/stats/statsRepository.service';
import { PokemonInterface } from './interfaces/pokemon.interfaces';

@Injectable()
export class PokemonService {
  constructor(
    private readonly pokemonRepository: PokemonRepositoryService,
    private readonly statsRepository: StatsRepository,
  ) {}

  async findAll(): Promise<PokemonInterface[]> {
    return this.pokemonRepository.findAll();
  }

  async create(createPokemonDto: CreatePokemonDto): Promise<PokemonInterface> {
    const stats = await this.statsRepository.create(createPokemonDto.stats);

    const pokemon: PokemonInterface = {
      name: createPokemonDto.name.toLowerCase(),
      type: createPokemonDto.type.toUpperCase(),
      stats: stats._id,
    };

    return this.pokemonRepository.create(pokemon);
  }

  async findOne(name: string): Promise<PokemonInterface | null> {
    return this.pokemonRepository.findOne(name);
  }

  async remove(name: string): Promise<PokemonInterface | null> {
    return this.pokemonRepository.remove(name);
  }

  async update(
    name: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<PokemonInterface | null> {
    return this.pokemonRepository.update(name, updatePokemonDto);
  }
}
