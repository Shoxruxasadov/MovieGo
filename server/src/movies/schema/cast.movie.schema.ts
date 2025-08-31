import { Types, Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LangDto } from '../dto/lang.dto';

export type CastMovieDocument = HydratedDocument<CastMovie>;

@Schema({ timestamps: true })
export class CastMovie {
  @Prop({
    type: Types.ObjectId,
    required: false,
    ref: 'Cast',
  })
  actor: Types.ObjectId;

  @Prop({ required: false })
  role: LangDto;
}

export const CastMovieSchema = SchemaFactory.createForClass(CastMovie);
