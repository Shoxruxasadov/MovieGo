import { IsNotEmpty, IsOptional } from 'class-validator';
import { LangDto } from 'src/movies/dto/lang.dto';

export class GenreDto {
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  title: LangDto;

  @IsNotEmpty()
  image: string;
}
