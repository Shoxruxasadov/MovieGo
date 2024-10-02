import { IsNotEmpty } from 'class-validator';
import { LangDto } from './lang.dto';
import { ImageDto } from './image.dto';
import { MovieDto } from './movie.dto';
import { SerieDto } from './serie.dto.';

export class MoviesDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  title: LangDto;

  @IsNotEmpty()
  description: LangDto;

  @IsNotEmpty()
  image: ImageDto;

  source: MovieDto | null;
  
  episodes: SerieDto[] | null;

  seasons: string[] | null;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  module: string;

  @IsNotEmpty()
  format: string;

  @IsNotEmpty()
  resolution: string;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  release: string;

  @IsNotEmpty()
  timeline: string;

  grossing: string | null;

  budget: string | null;

  @IsNotEmpty()
  studio: any;

  @IsNotEmpty()
  made: string;

  @IsNotEmpty()
  mpa: number;

  @IsNotEmpty()
  genre: string[];

  @IsNotEmpty()
  languages: string[];

  @IsNotEmpty()
  ratings: string[];

  @IsNotEmpty()
  cast: any[];

  @IsNotEmpty()
  directors: any[];

  @IsNotEmpty()
  producers: any[];

  @IsNotEmpty()
  screenwriters: any[];
}
