import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonRepositoryService } from './pokemonRepository.service';
import { StatsRepository } from 'src/stats/statsRepository.service';
import { PokemonInterface } from './interfaces/pokemon.interfaces';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  PokeApiListResponse,
  PokeApiDetailResponse,
} from './adapters/pokeapi.interfaces';
import { mapPokeApiToCreatePokemonDto } from './adapters/pokeapi.mapper';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
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

  async seedFromPokeApi() {
    const { data } = await firstValueFrom(
      this.httpService.get<PokeApiListResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=1350',
      ),
    );

    const chunkArray = <T>(arr: T[], size: number): T[][] =>
      arr.length > size
        ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
        : [arr];

    // Process in chunks of 50 to avoid rate limits/timeouts
    const chunks = chunkArray(data.results, 50);

    for (const chunk of chunks) {
      await Promise.all(chunk.map((item) => this.seedSinglePokemon(item.url)));
    }

    return { message: 'Pokemon seeded successfully' };
  }

  private async seedSinglePokemon(url: string) {
    const { data } = await firstValueFrom(
      this.httpService.get<PokeApiDetailResponse>(url),
    );

    const createPokemonDto = mapPokeApiToCreatePokemonDto(data);

    const stats = await this.statsRepository.create(createPokemonDto.stats);

    const pokemon: PokemonInterface = {
      name: createPokemonDto.name.toLowerCase(),
      type: createPokemonDto.type.toUpperCase(),
      stats: stats._id,
    };

    await this.pokemonRepository.create(pokemon);
  }
}
