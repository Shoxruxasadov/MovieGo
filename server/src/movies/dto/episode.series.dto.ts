import { LangDto } from './lang.dto';
import { MovieDto } from './movie.dto';

export class EpisodeSeriesDto {
  'title': LangDto;
  'duration': number;
  'preview': string;
  'watching': MovieDto | null;
}


