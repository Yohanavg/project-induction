
import { ApiProperty } from '@nestjs/swagger';

export class ResponseStatsDto {
  @ApiProperty()
  life: number;

  @ApiProperty()
  attack: number;

  @ApiProperty()
  defense: number;

  @ApiProperty()
  speed: number;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
