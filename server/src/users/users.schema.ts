import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: null })
  phone?: number;

  @Prop({ required: false, default: null })
  email?: string;

  @Prop({ required: false, default: null })
  password?: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: false, default: null })
  gender?: string;

  @Prop({
    type: Types.ObjectId,
    default: null,
    ref: 'Country',
  })
  country?: Types.ObjectId;

  @Prop({
    type: Date,
    required: false,
    set: (value: string) => new Date(value),
    default: null,
  })
  birthday?: Date;

  @Prop({ required: false, default: null })
  image?: string;

  @Prop({
    type: [Types.ObjectId],
    required: false,
    ref: 'Movies',
  })
  story?: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    required: true,
    ref: 'Movies',
  })
  favorites?: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    required: true,
    ref: 'Movies',
  })
  news?: Types.ObjectId[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
