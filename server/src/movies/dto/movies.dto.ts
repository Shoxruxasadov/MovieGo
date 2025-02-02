import { IsNotEmpty, IsOptional, IsDateString, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';
import { ImageMoviesDto } from './image.movies.dto';
import { ImageSeriesDto } from './image.series.dto';
import { SourceMoviesDto } from './source.movies.dto';
import { SourceSeriesDto } from './source.series.dto';
import { RatingsDto } from './ratings.dto';
import { CastDto } from './cast.dto';
import { LangDto } from './lang.dto';

export class MoviesDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  title: LangDto;

  @IsNotEmpty()
  description: LangDto;

  @IsNotEmpty()
  image: ImageMoviesDto | ImageSeriesDto;

  @IsOptional()
  @IsNotEmpty()
  source: SourceMoviesDto | Array<Array<SourceSeriesDto>> | null;

  @IsOptional()
  @IsNotEmpty()
  trailer: SourceSeriesDto[] | null;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @Transform(
    ({ value }) => {
      console.log(value);
      if (typeof value === 'boolean') return value;
      return value === 'true';
    },
    { toClassOnly: true },
  )
  purchase: Boolean; // true = subscription // false = free

  @IsNotEmpty()
  format: string;

  @IsNotEmpty()
  duration: number;

  @IsDateString()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  release: Date;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value ? new Date(value) : null), {
    toClassOnly: true,
  })
  timeline: Date | null;

  @IsOptional()
  @IsNotEmpty()
  grossing: number | null;

  @IsOptional()
  @IsNotEmpty()
  budget: number | null;

  @IsNotEmpty()
  mpaa: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  ratings: RatingsDto;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  country: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  studio: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  category: string;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    value.map((id: string) => new mongoose.Types.ObjectId(id)),
  )
  genres: string[];

  @IsArray()
  @IsOptional()
  casts: CastDto[];

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    value.map((id: string) => new mongoose.Types.ObjectId(id)),
  )
  directors: string[];

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    value.map((id: string) => new mongoose.Types.ObjectId(id)),
  )
  producers: string[];

  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    value.map((id: string) => new mongoose.Types.ObjectId(id)),
  )
  scenarists: string[];
}
