import { LangDto } from './lang.dto';

export class SourceSeriesDto {
  'title': LangDto;
  'duration': number;
  'preview': string;
  '2160p': string | null;
  '1080p': string | null;
  '720p': string | null;
}
