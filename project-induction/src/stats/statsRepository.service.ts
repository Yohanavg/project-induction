import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats as StatsSchema } from './schemas/stats.schema';
import { Stats as StatsInterface } from './interfaces/stats.interface';

import { CreateStatsDto } from './dto/create-stats.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';

@Injectable()
export class StatsRepository {
  constructor(
    @InjectModel(StatsSchema.name)
    private readonly statsModel: Model<StatsSchema>,
  ) {}

  async create(createStatsDto: CreateStatsDto): Promise<StatsInterface> {
    const stats = await this.statsModel.create(createStatsDto);
    return stats.toObject();
  }

  async update(
    id: string,
    updateStatsDto: UpdateStatsDto,
  ): Promise<StatsInterface | null> {
    return this.statsModel
      .findByIdAndUpdate(id, updateStatsDto, { new: true })
      .lean()
      .exec();
  }
}
