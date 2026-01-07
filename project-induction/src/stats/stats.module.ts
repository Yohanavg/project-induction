import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Stats, StatsSchema } from './stats.schema';
import { StatsRepository } from './stats.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stats.name, schema: StatsSchema },
    ]),
  ],
  providers: [StatsRepository],  
  exports: [StatsRepository],     
})
export class StatsModule {}
