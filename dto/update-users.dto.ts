import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  age: number;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  diplomas: string[];
}
