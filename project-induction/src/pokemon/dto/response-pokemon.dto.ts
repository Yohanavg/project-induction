import { ApiProperty } from '@nestjs/swagger';
import { ResponseStatsDto } from 'src/stats/dto/response-stats.dto';

export class ResponsePokemonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty({ type: ResponseStatsDto })
  stats: ResponseStatsDto;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
