import { Type } from 'class-transformer';
import {IsString, ValidateNested} from 'class-validator'
import { CreateStatsDto } from 'src/stats/stats.dto';


export class CreatePokemonDto {
    @IsString()   
    name: string;

    @IsString()    
    type: string;

    @ValidateNested()   
    @Type(() => CreateStatsDto)
     stats: CreateStatsDto;
}