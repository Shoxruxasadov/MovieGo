import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { LangDto } from 'src/movies/dto/lang.dto';

export type CastDocument = HydratedDocument<Cast>;

@Schema({ timestamps: true })
export class Cast {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: LangDto;

  @Prop({ type: Date, required: true })
  birthday: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Country',
  })
  country: string;

  @Prop({ required: true })
  image: string;
}

export const CastSchema = SchemaFactory.createForClass(Cast);
