import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { LangDto } from 'src/movies/dto/lang.dto';

export type CountriesDocument = HydratedDocument<Countries>;

@Schema({ timestamps: true })
export class Countries {
  @Prop({ required: true, unique: true })
  path: string;

  @Prop({ required: true })
  title: LangDto;

  @Prop({ required: true })
  flag: string;
}

export const CountriesSchema = SchemaFactory.createForClass(Countries);
