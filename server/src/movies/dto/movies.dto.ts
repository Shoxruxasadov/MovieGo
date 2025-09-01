import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsIn,
  IsMongoId,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { ImageMoviesDto } from './image.movies.dto';
import { ImageSeriesDto } from './image.series.dto';
import { SourceSeriesDto } from './source.series.dto';
import { RatingsDto } from './ratings.dto';
import { CastDto } from './cast.dto';
import { LangDto } from './lang.dto';
import { MovieDto } from './movie.dto';

export const VIDEO_TYPES = ['movie', 'serie'] as const;
export type VideoType = (typeof VIDEO_TYPES)[number];

export const VIDEO_MODULES = ['movies', 'series', 'anime', 'cartoon'] as const;
export type VideoModule = (typeof VIDEO_MODULES)[number];

export class MoviesDto {
  @IsNotEmpty()
  readonly path: string;

  @IsNotEmpty()
  readonly title: LangDto;

  @IsNotEmpty()
  readonly description: LangDto;

  @IsNotEmpty()
  readonly image: ImageMoviesDto | ImageSeriesDto;

  @IsOptional()
  @IsNotEmpty()
  readonly source: SourceSeriesDto[][] | MovieDto | null;

  @IsOptional()
  @IsNotEmpty()
  readonly trailer: SourceSeriesDto[] | null;

  @IsNotEmpty()
  @IsIn(VIDEO_TYPES, {
    message: `type must be one of: ${VIDEO_TYPES.join(' | ')}`,
  })
  readonly type: VideoType;

  @IsNotEmpty()
  @IsIn(VIDEO_MODULES, {
    message: `module must be one of: ${VIDEO_MODULES.join(' | ')}`,
  })
  readonly module: VideoModule;

  @IsOptional()
  readonly carousel: number | null;

  @IsNotEmpty()
  @Transform(
    ({ value }) => {
      if (typeof value === 'boolean') return value;
      return value === 'true';
    },
    { toClassOnly: true },
  )
  readonly purchase: boolean;

  @IsNotEmpty()
  readonly format: string;

  @IsNotEmpty()
  readonly duration: number;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  readonly release: Date;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null), {
    toClassOnly: true,
  })
  readonly timeline?: Date | null;

  @IsOptional()
  readonly grossing: number | null;

  @IsOptional()
  readonly budget: number | null;

  @IsNotEmpty()
  readonly mpaa: number;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly resolution: string[];

  @IsNotEmpty()
  readonly languages: string[];

  @IsNotEmpty()
  readonly ratings: RatingsDto;

  @IsMongoId()
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value), { toClassOnly: true })
  readonly country: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value), { toClassOnly: true })
  readonly studio: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  @Transform(({ value }) => value.map((id: string) => new Types.ObjectId(id)), {
    toClassOnly: true,
  })
  readonly category: Types.ObjectId[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => value.map((id: string) => new Types.ObjectId(id)), {
    toClassOnly: true,
  })
  readonly genres: Types.ObjectId[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.map((id: string) => new Types.ObjectId(id)), {
    toClassOnly: true,
  })
  readonly directors: Types.ObjectId[] | null;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.map((id: string) => new Types.ObjectId(id)), {
    toClassOnly: true,
  })
  readonly producers: Types.ObjectId[] | null;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.map((id: string) => new Types.ObjectId(id)), {
    toClassOnly: true,
  })
  readonly scenarists: Types.ObjectId[] | null;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  readonly cast: CastDto[] | null;
}
