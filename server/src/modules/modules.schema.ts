import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ModulesDocument = HydratedDocument<Modules>;

@Schema({ timestamps: true })
export class Modules {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  module: string;
}

export const ModulesSchema = SchemaFactory.createForClass(Modules);
