import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    async findAll(){
        return await this.pokemonService.findAll() //Get
    }

    @Post()
    async create(@Body() CreatePokemonDto: CreatePokemonDto){
        return await this.pokemonService.create(CreatePokemonDto) //Post
    }

    @Get(':name')
    async findOne(@Param('name') name:string) {
        return await this.pokemonService.findOne(name); //Read
    }

    @Delete(':name')
    async remove(@Param('name') name:string) {
         return await this.pokemonService.remove(name); //Delete
    }
}
