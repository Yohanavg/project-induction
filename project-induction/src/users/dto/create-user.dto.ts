import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Juan',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Perez',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User email',
    example: 'perez@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
