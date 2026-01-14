import { Controller, Get, Query } from '@nestjs/common';
import { BuscalibreService } from './buscalibre.service';

@Controller('buscalibre')
export class BuscalibreController {
  constructor(private readonly buscalibreService: BuscalibreService) {}

  @Get('search')
  search(@Query('name') name: string) {
    return this.buscalibreService.searchPokemonBooks(name);
  }
}
