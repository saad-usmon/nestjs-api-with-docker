import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNumberString()
  readonly age: number;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  readonly flavors: string[];
}
