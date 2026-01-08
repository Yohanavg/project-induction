import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {Pokemon, PokemonDocument } from './schemas/pokemon.schema';
import { PokemonInterface} from './interfaces/pokemon.interfaces';
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";


@Injectable()
export class PokemonRepositoryService {
  constructor(
    @InjectModel(Pokemon.name)
    private pokemonModel: Model<PokemonDocument>
  ) {}

  async findAll(): Promise<PokemonDocument[]> {
    return this.pokemonModel.find().populate('stats').exec();
  }

  async create(pokemon: PokemonInterface): Promise<PokemonDocument> {
    const nuevoPokemon = new this.pokemonModel(pokemon);
    return nuevoPokemon.save();
  }

  async findOne(name: string): Promise<PokemonDocument | null> {
    return this.pokemonModel.findOne({ name }).populate('stats').exec();
  }

  async remove(name: string): Promise<PokemonDocument | null> {
    return this.pokemonModel.findOneAndDelete({ name }).exec();
  }

  async update(name: string, updatePokemonDto: UpdatePokemonDto): Promise<PokemonDocument | null> {
  return this.pokemonModel.findOneAndUpdate({ name }, updatePokemonDto, { new: true }).exec();
}


}