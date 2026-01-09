import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { CreateStatsDto } from 'src/stats/dto/create-stats.dto';

export class CreatePokemonDto {
  @ApiProperty({
    description: 'Pokemon name',
    example: 'pikachu',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Pokemon type',
    example: 'ELECTRIC',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Pokemon stats',
    type: CreateStatsDto,
  })
  @ValidateNested()
  @Type(() => CreateStatsDto)
  stats: CreateStatsDto;
}
