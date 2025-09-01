import { IsOptional, IsArray, IsNotEmpty, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { LangDto } from './lang.dto';

export class CastDto {
  @IsMongoId()
  @Transform(({ value }) => new Types.ObjectId(value), { toClassOnly: true })
  actor: Types.ObjectId;

  @IsNotEmpty()
  role: LangDto;
}
