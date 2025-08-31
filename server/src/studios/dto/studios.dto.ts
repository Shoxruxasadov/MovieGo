import { IsNotEmpty, IsOptional } from 'class-validator';
import { LangDto } from 'src/movies/dto/lang.dto';

export class StudiosDto {
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  title: LangDto;

  @IsOptional()
  description: LangDto;

  @IsNotEmpty()
  image: string;
}
