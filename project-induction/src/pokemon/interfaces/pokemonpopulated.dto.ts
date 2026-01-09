import { PokemonInterface } from './pokemon.interfaces';
import { Stats } from '../../stats/interfaces/stats.interface';

export interface PokemonPopulated extends Omit<PokemonInterface, 'stats'> {
  stats: Stats;
}
