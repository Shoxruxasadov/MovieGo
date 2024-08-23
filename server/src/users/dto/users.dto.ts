import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  image: string | null;
}
