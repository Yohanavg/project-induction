import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Stats, StatsDocument } from './stats.schema';
import { CreateStatsDto } from './stats.dto';

@Injectable()
export class StatsRepository {
  constructor(
    @InjectModel(Stats.name)
    private readonly statsModel: Model<StatsDocument>,
  ) {}

  async create(stats: CreateStatsDto) {
    return this.statsModel.create(stats);
  }
}
