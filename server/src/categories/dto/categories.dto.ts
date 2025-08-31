import { IsNotEmpty } from 'class-validator';
import { LangDto } from 'src/movies/dto/lang.dto';

export class CategoriesDto {
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  title: LangDto;

  @IsNotEmpty()
  image: string;
}
