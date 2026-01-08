import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PokemonNameParamDto {
  @ApiProperty({
    description: 'Pokemon name',
    example: 'pikachu',
  })
  @IsString()
  name: string;
}
