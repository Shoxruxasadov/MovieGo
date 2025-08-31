import {
  IsDateString,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Date, Document, Types } from 'mongoose';

export class UsersDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly phone?: number;

  @IsOptional()
  readonly email?: string;

  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  readonly password?: string;

  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  readonly gender?: string;

  @IsOptional()
  @Transform(({ value }) => new Types.ObjectId(value))
  readonly country: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  readonly birthday?: Date;

  @IsOptional()
  readonly image?: string;

  @IsOptional()
  @IsMongoId()
  @Transform(({ value }) => value.map((id: string) => new Types.ObjectId(id)))
  readonly story?: string[];

  @IsOptional()
  @IsMongoId()
  @Transform(({ value }) => value.map((id: string) => new Types.ObjectId(id)))
  readonly favorites?: string[];

  @IsOptional()
  @IsMongoId()
  @Transform(({ value }) => value.map((id: string) => new Types.ObjectId(id)))
  readonly news?: string[];
}
