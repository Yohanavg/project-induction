import { PokeApiDetailResponse } from './pokeapi.interfaces';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';

export function mapPokeApiToCreatePokemonDto(
  data: PokeApiDetailResponse,
): CreatePokemonDto {
  return {
    name: data.name,
    type: data.types[0].type.name,
    stats: {
      life: data.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 0,
      attack: data.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 0,
      defense:
        data.stats.find((s) => s.stat.name === 'defense')?.base_stat ?? 0,
      speed: data.stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 0,
    },
  };
}
