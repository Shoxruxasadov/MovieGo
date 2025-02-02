import { Types, Schema as MongooseSchema, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CastMovieDocument = HydratedDocument<CastMovie>;

@Schema({ timestamps: true })
export class CastMovie {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: 'Cast',
  })
  cast: MongooseSchema.Types.ObjectId;

  @Prop({ required: false })
  role: string;
}

export const CastMovieSchema = SchemaFactory.createForClass(CastMovie);
