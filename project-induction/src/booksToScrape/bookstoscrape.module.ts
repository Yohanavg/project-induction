import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BookstoscrapeController } from './bookstoscrape.controller';
import { BookstoscrapeService } from './bookstoscrape.service';

@Module({
  imports: [HttpModule],
  controllers: [BookstoscrapeController],
  providers: [BookstoscrapeService],
})
export class BuscalibreModule {}
