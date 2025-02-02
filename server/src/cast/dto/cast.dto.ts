import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import mongoose from 'mongoose';
import { LangDto } from 'src/movies/dto/lang.dto';

export class CastDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  title: LangDto;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value ? new Date(value) : null), {
    toClassOnly: true,
  })
  birthday: Date;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  country: string;

  @IsOptional()
  @IsNotEmpty()
  image: string;
}
