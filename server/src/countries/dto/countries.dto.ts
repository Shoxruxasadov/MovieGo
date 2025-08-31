import { IsNotEmpty } from 'class-validator';
import { LangDto } from 'src/movies/dto/lang.dto';

export class CountriesDto {
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  title: LangDto;

  @IsNotEmpty()
  flag: string;
}
