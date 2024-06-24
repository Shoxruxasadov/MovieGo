import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { LangDto } from './dto/lang.dto';
import { ImageDto } from './dto/image.dto';

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
  source: string;

  @Prop({ required: true })
  image: ImageDto;

  @Prop({ required: true })
  issue: string;

  @Prop({ required: true })
  event: string;

  @Prop({ required: true })
  module: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  income: string;

  @Prop({ required: true })
  expense: string;

  @Prop({ required: true })
  format: string;

  @Prop({ required: true })
  resolution: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  certificate: string;

  @Prop({ required: true })
  genre: string[];

  @Prop({ required: true })
  languages: string[];

  @Prop({ required: true })
  made: string;

  @Prop({ required: true })
  admitted: number;

  @Prop({ required: true })
  cast: string[];

  @Prop({ required: true })
  directors: string[];

  @Prop({ required: true })
  producers: string[];

  @Prop({ required: true })
  screenwriters: string[];
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
