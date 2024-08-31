import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { LangDto } from 'src/movies/dto/lang.dto';

export type StudiosDocument = HydratedDocument<Studios>;

@Schema({ timestamps: true })
export class Studios {
  @Prop({ required: true })
  name: LangDto;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  module: string;
}

export const StudiosSchema = SchemaFactory.createForClass(Studios);
