import { IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';
import { LangDto } from './lang.dto';

export class CastDto {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  actor: string;

  @IsNotEmpty()
  @IsOptional()
  role: LangDto;
}
