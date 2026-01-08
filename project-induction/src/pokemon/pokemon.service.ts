import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonRepositoryService } from './pokemonRepository.service';
import { StatsRepository } from 'src/stats/stats.repository';
import { PokemonDocument } from './schemas/pokemon.schema';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    private readonly pokemonRepository: PokemonRepositoryService,
    private readonly statsRepository: StatsRepository
  ) {}

  
  async findAll(): Promise<PokemonDocument[]> {
    return this.pokemonRepository.findAll(); 
  }

 
  async create(createPokemonDto: CreatePokemonDto): Promise<PokemonDocument> {
    
    const stats = await this.statsRepository.create(createPokemonDto.stats);


    const pokemon = {
      name: createPokemonDto.name.toLowerCase(),
      type: createPokemonDto.type.toUpperCase(),
      stats: stats._id,
    };

   
    return this.pokemonRepository.create(pokemon);
  }


  async findOne(name: string): Promise<PokemonDocument | null> {
    return this.pokemonRepository.findOne(name); // populate ya está en el repository
  }


  async remove(name: string): Promise<PokemonDocument | null> {
    return this.pokemonRepository.remove(name);
  }

  async update(name: string, updatePokemonDto: UpdatePokemonDto): Promise<PokemonDocument | null> {
    return this.pokemonRepository.update(name, updatePokemonDto);
  }
}
