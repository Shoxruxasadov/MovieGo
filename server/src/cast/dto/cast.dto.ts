import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Date, Document, Types } from 'mongoose';

export class CastDto {
  @IsNotEmpty()
  readonly path: string;

  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value ? new Date(value) : null), {
    toClassOnly: true,
  })
  readonly birthday?: Date;

  @IsOptional()
  @Transform(({ value }) => new Types.ObjectId(value))
  readonly country?: string;

  @IsOptional()
  readonly image?: string;
}
