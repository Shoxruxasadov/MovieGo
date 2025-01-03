import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ActorsDocument = HydratedDocument<Actors>;

@Schema({ timestamps: true })
export class Actors {
  @Prop({ required: false })
  name: string | null;

  @Prop({ required: false })
  role: string | null;

  @Prop({ required: true })
  image: string;
}

export const ActorsSchema = SchemaFactory.createForClass(Actors);
