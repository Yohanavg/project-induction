import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon, PokemonDocument } from './schemas/pokemon.schema';


@Injectable()
export class PokemonRepositoryService {
  constructor(
      @InjectModel(Pokemon.name) 
      private pokemonModel: Model<PokemonDocument> 
    ) {}

    // 2. Cambia findAll para que busque en la BD
      async findAll() {
        return await this.pokemonModel.find().exec();
      }
    
      // 3. Cambia create para que guarde en MongoDB
      async create(pokemon: any) {
        const nuevoPokemon = new this.pokemonModel(pokemon);
        return await nuevoPokemon.save();
      }

    
      // 4. Cambia findOne para buscar por nombre en la BD
      async findOne(name: string) {
        return await this.pokemonModel.findOne({ name }).exec();
      }
    
      // 5. Cambia remove para borrar de la BD
      async remove(name: string) {
        return await this.pokemonModel.findOneAndDelete({ name }).exec();
      }
}