import { PartialType } from '@nestjs/mapped-types';
import { CreateStatsDto } from './stats.dto';

export class UpdateStatsDto extends PartialType(CreateStatsDto) {}