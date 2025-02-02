import { IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';

export class CastDto {
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  cast: string;

  @IsNotEmpty()
  @IsOptional()
  role: string;
}
