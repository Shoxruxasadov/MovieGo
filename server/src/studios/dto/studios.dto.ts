import { IsNotEmpty } from 'class-validator';
import { LangDto } from 'src/movies/dto/lang.dto';

export class StudiosDto {
  @IsNotEmpty()
  name: LangDto;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  module: string;
}
