import {
  Types,
  Schema as MongooseSchema,
  HydratedDocument,
  Date,
} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LangDto } from 'src/movies/dto/lang.dto';
import { ImageMoviesDto } from 'src/movies/dto/image.movies.dto';
import { ImageSeriesDto } from 'src/movies/dto/image.series.dto';
import { SourceMoviesDto } from 'src/movies/dto/source.movies.dto';
import { SourceSeriesDto } from 'src/movies/dto/source.series.dto';
import { RatingsDto } from 'src/movies/dto/ratings.dto';
import { CastMovie } from './schema/cast.movie.schema';

export type MoviesDocument = HydratedDocument<Movies>;

@Schema({ timestamps: true })
export class Movies {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: LangDto;

  @Prop({ required: true })
  description: LangDto;

  @Prop({ type: () => [ImageMoviesDto, ImageSeriesDto], required: true })
  image: ImageMoviesDto | ImageSeriesDto;

  @Prop({ type: () => [SourceMoviesDto, Array], required: false })
  source: SourceMoviesDto | Array<Array<SourceSeriesDto>> | null;

  @Prop({ required: false })
  trailer: SourceSeriesDto[] | null;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  purchase: Boolean;

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
    required: false,
    set: (value: string) => new Date(value),
  })
  timeline: Date | null;

  @Prop({ required: false })
  grossing: number | null;

  @Prop({ required: false })
  budget: number | null;

  @Prop({ required: true })
  mpaa: number;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  ratings: RatingsDto;

  // @Prop({
  //   type: MongooseSchema.Types.ObjectId,
  //   required: true,
  //   ref: 'Country',
  // })
  // country: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Studios',
  })
  studio: MongooseSchema.Types.ObjectId;

  // @Prop({
  //   type: MongooseSchema.Types.ObjectId,
  //   required: true,
  //   ref: 'Category',
  // })
  // category: MongooseSchema.Types.ObjectId;

  // @Prop({
  //   type: [MongooseSchema.Types.ObjectId],
  //   required: true,
  //   ref: 'Genres',
  // })
  // genres: MongooseSchema.Types.ObjectId[];

  @Prop({ required: false })
  casts: CastMovie[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    required: false,
    ref: 'Cast',
  })
  directors: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    required: false,
    ref: 'Cast',
  })
  producers: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    required: false,
    ref: 'Cast',
  })
  scenarists: MongooseSchema.Types.ObjectId[];
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);

MoviesSchema.index(
  { 'title.uz': 'text', 'title.ru': 'text', 'title.en': 'text' },
  { weights: { 'title.ru': 3, 'title.uz': 2, 'title.en': 1 } },
);
