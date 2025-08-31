import { LangDto } from './lang.dto';
import { MovieDto } from './movie.dto';

export class SourceSeriesDto {
  'title': LangDto;
  'duration': number;
  'preview': string;
  'episode': MovieDto | null;
}
