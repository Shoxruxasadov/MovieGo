import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { LangDto } from 'src/movies/dto/lang.dto';

export type GenresDocument = HydratedDocument<Genres>;

@Schema({ timestamps: true })
export class Genres {
  @Prop({ required: true, unique: true })
  path: string;

  @Prop({ required: true })
  title: LangDto;

  @Prop({ required: true })
  image: string;
}

export const GenresSchema = SchemaFactory.createForClass(Genres);
