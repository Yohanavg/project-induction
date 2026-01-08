import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateStatsDto {
  @ApiProperty({ example: 100 })
  @IsInt()
  life: number;

  @ApiProperty({ example: 55 })
  @IsInt()
  attack: number;

  @ApiProperty({ example: 40 })
  @IsInt()
  defense: number;

  @ApiProperty({ example: 90 })
  @IsInt()
  speed: number;
}
