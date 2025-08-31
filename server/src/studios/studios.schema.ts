import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { LangDto } from 'src/movies/dto/lang.dto';

export type StudiosDocument = HydratedDocument<Studios>;

@Schema({ timestamps: true })
export class Studios {
  @Prop({ required: true, unique: true })
  path: string;

  @Prop({ required: true })
  title: LangDto;

  @Prop({ default: null })
  description: LangDto;

  @Prop({ required: true })
  image: string;
}

export const StudiosSchema = SchemaFactory.createForClass(Studios);
