import { Controller, Get, Query } from '@nestjs/common';
import { KtronixService } from './ktronix.service';

@Controller('ktronix')
export class KtronixController {
  constructor(private readonly ktronixService: KtronixService) {}

  @Get('search')
  search(@Query('q') query: string) {
    return this.ktronixService.searchKtronix(query);
  }
}
