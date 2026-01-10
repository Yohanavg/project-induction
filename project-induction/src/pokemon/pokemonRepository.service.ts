import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from './schemas/pokemon.schema';
import { PokemonInterface } from './interfaces/pokemon.interfaces';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonRepositoryService {
  constructor(
    @InjectModel(Pokemon.name)
    private pokemonModel: Model<PokemonInterface>,
  ) {}

  async findAll(): Promise<PokemonInterface[]> {
    return this.pokemonModel.find().populate('stats').lean().exec();
  }

  async create(pokemon: PokemonInterface): Promise<PokemonInterface> {
    const nuevoPokemon = await this.pokemonModel.create(pokemon);
    return nuevoPokemon.toObject();
  }

  async findOne(name: string): Promise<PokemonInterface | null> {
    return this.pokemonModel.findOne({ name }).populate('stats').lean().exec();
  }

  async remove(name: string): Promise<PokemonInterface | null> {
    return this.pokemonModel.findOneAndDelete({ name }).lean().exec();
  }

  async update(
    name: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<PokemonInterface | null> {
    return this.pokemonModel
      .findOneAndUpdate({ name }, updatePokemonDto, { new: true })
      .lean()
      .exec();
  }
}
