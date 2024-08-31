import { LangDto } from './lang.dto';

export class SerieDto {
  'title': LangDto;
  'duration': number;
  'image': string;
  '2160p': LangDto | null;
  '1080p': LangDto | null;
  '720p': LangDto | null;
}
