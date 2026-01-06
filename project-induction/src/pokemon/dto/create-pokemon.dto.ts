import {IsString, IsNumber,IsObject} from 'class-validator'


export class StatsDto {
    @IsNumber()
    life: number;

    @IsNumber()
    attack: number;

    @IsNumber()
    defense: number;

    @IsNumber()
    speed: number
}

export class CreatePokemonDto {
    @IsString()   
    name: string;

    @IsString()    
    type: string;

    @IsObject()   
     stats: StatsDto;
}