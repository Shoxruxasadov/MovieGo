import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { LangDto } from './dto/lang.dto';
import { ImageDto } from './dto/image.dto';
import { MovieDto } from './dto/movie.dto';
import { SerieDto } from './dto/serie.dto.';
import { Actors } from 'src/actors/actors.schema';
import { Studios } from 'src/studios/studios.schema';

export type MoviesDocument = HydratedDocument<Movies>;

@Schema({ timestamps: true })
export class Movies {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: LangDto;

  @Prop({ required: true })
  description: LangDto;

  @Prop({ required: true })
  image: ImageDto;

  @Prop({ required: false })
  source: MovieDto | null;

  @Prop({ required: false })
  episodes: SerieDto[] | null;

  @Prop({ required: false })
  seasons: string[] | null;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  module: string;

  @Prop({ required: true })
  format: string;

  @Prop({ required: true })
  resolution: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ type: Date, required: true })
  release: Date;

  @Prop({ type: Date, required: true })
  timeline: Date;

  @Prop({ required: false })
  grossing: string | null;

  @Prop({ required: false })
  budget: string | null;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Studios',
  })
  studio: Studios;

  @Prop({ required: true })
  certificate: string;

  @Prop({ required: true })
  made: string;

  @Prop({ required: true })
  mpa: number;

  @Prop({ required: true })
  genre: string[];

  @Prop({ required: true })
  languages: string[];

  @Prop({ required: true })
  ratings: string[];

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Actors',
    },
  ])
  cast: Actors[];

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Actors',
    },
  ])
  directors: Actors[];

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Actors',
    },
  ])
  producers: Actors[];

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      required: true,
      ref: 'Actors',
    },
  ])
  screenwriters: Actors[];
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
