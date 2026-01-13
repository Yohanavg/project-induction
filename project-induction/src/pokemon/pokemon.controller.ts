import {
  Body,
  Controller,
  UseGuards,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonNameParamDto } from './dto/nameparam-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonAuthGuard } from '../auth/guards/pokemon-auth.guard';

@ApiTags('Pokémon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Pokemon' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all Pokemon',
  })
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('seed')
  async seed() {
    return this.pokemonService.seedFromPokeApi();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get a Pokemon by name' })
  @ApiParam({
    name: 'name',
    description: 'Name of the Pokemon',
  })
  @ApiResponse({
    status: 200,
    description: 'Pokemon found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Pokemon not found',
  })
  findOne(@Param() params: PokemonNameParamDto) {
    return this.pokemonService.findOne(params.name);
  }

  @Post()
  @UseGuards(PokemonAuthGuard)
  @ApiOperation({ summary: 'Create a new Pokemon' })
  @ApiBody({ type: CreatePokemonDto })
  @ApiResponse({
    status: 201,
    description: 'Pokemon created successfully',
  })
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Put(':name')
  @ApiOperation({ summary: 'Update a Pokemon by name' })
  @ApiParam({
    name: 'name',
    description: 'Name of the Pokemon to update',
  })
  @ApiBody({ type: UpdatePokemonDto })
  @ApiResponse({
    status: 200,
    description: 'Pokemon updated successfully',
  })
  update(
    @Param() params: PokemonNameParamDto,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(params.name, updatePokemonDto);
  }

  @Delete(':name')
  @ApiOperation({ summary: 'Delete a Pokemon by name' })
  @ApiParam({
    name: 'name',
    description: 'Name of the Pokemon to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Pokemon deleted successfully',
  })
  remove(@Param() params: PokemonNameParamDto) {
    return this.pokemonService.remove(params.name);
  }
}
