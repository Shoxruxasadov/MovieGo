import { IsNotEmpty } from 'class-validator';

export class ModulesDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  module: string;
}
