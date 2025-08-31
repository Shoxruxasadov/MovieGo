import { IsOptional, IsUrl } from 'class-validator';

export class MovieDto {
  @IsOptional()
  @IsUrl()
  '2160p': string | null;

  @IsOptional()
  @IsUrl()
  '1080p': string | null;

  @IsOptional()
  @IsUrl()
  '720p': string | null;

  @IsOptional()
  @IsUrl()
  'uz': string | null;

  @IsOptional()
  @IsUrl()
  'ru': string | null;

  @IsOptional()
  @IsUrl()
  'en': string | null;
}
