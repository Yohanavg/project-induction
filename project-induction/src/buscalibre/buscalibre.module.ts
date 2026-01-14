import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BuscalibreController } from './buscalibre.controller';
import { BuscalibreService } from './buscalibre.service';

@Module({
  imports: [HttpModule],
  controllers: [BuscalibreController],
  providers: [BuscalibreService],
})
export class BuscalibreModule {}
