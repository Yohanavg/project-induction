import { Controller, Get, Query } from '@nestjs/common';
import { BookstoscrapeService } from './bookstoscrape.service';

@Controller('books')
export class BookstoscrapeController {
  constructor(private readonly bookstoscrapeService: BookstoscrapeService) {}

  @Get('search')
  search(@Query('name') name: string) {
    return this.bookstoscrapeService.scrapeTestBooks(name);
  }
}
