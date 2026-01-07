import { IsNumber } from 'class-validator';

export class CreateStatsDto {
  @IsNumber()
  life: number;

  @IsNumber()
  attack: number;

  @IsNumber()
  defense: number;

  @IsNumber()
  speed: number;
}