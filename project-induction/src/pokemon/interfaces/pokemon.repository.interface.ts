import { PokemonInterface } from './pokemon.interfaces';


export interface PokemonRepository {
  findAll(): Promise<PokemonInterface[]>;
  create(pokemon: PokemonInterface): Promise<PokemonInterface>;
  findOne(name: string): Promise<PokemonInterface | null>;
  remove(name: string): Promise<PokemonInterface | null>;
}
