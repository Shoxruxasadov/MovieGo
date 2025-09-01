import { Date, Types, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ImageMoviesDto } from 'src/movies/dto/image.movies.dto';
import { ImageSeriesDto } from 'src/movies/dto/image.series.dto';
import { SourceSeriesDto } from 'src/movies/dto/source.series.dto';
import { RatingsDto } from 'src/movies/dto/ratings.dto';
import { LangDto } from 'src/movies/dto/lang.dto';
import { CastMovie } from './schema/cast.movie.schema';

export type MoviesDocument = HydratedDocument<Movies>;

@Schema({ timestamps: true })
export class Movies {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  title: LangDto;

  @Prop({ required: true })
  description: LangDto;

  @Prop({ type: () => [ImageMoviesDto, ImageSeriesDto], required: true })
  image: ImageMoviesDto | ImageSeriesDto;

  @Prop({ type: () => [[[SourceSeriesDto]], String], default: null })
  source: SourceSeriesDto[][] | string | null;

  @Prop({ default: null })
  trailer: SourceSeriesDto[] | null;

  @Prop({ required: true })
  type: string; // movies // series //

  @Prop({ required: true })
  module: string; // movies // series // anime // cartoons //

  @Prop({ type: Number, default: null })
  carousel: number | null; // carousel //

  @Prop({ required: true })
  purchase: Boolean; // true - paid // false - free //

  @Prop({ required: true })
  format: string;

  @Prop({ required: true })
  duration: number;

  @Prop({
    type: Date,
    required: true,
    set: (value: string) => new Date(value),
  })
  release: Date;

  @Prop({
    type: Date,
    default: null,
    set: (value: string) => new Date(value),
  })
  timeline?: Date | null;

  @Prop({ default: null })
  grossing: number | null;

  @Prop({ default: null })
  budget: number | null;

  @Prop({ required: true })
  mpaa: number;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  resolution: string[];

  @Prop({ required: true })
  languages: string[];

  @Prop({ required: true })
  ratings: RatingsDto;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Countries' })
  country: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Studios' })
  studio: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId,  }], required: true, })
  category: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Genres' }], required: true, })
  genres: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Cast' }], default: null, })
  directors: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Cast' }], default: null, })
  producers: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Cast' }], default: null, })
  scenarists: Types.ObjectId[];

  @Prop({ default: null })
  cast: CastMovie[];
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);

MoviesSchema.index(
  { 'title.uz': 'text', 'title.ru': 'text', 'title.en': 'text' },
  { weights: { 'title.ru': 3, 'title.uz': 2, 'title.en': 1 } },
);
