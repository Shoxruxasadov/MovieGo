import { EpisodeSeriesDto } from "./episode.series.dto";

export class SourceSeriesDto {
  'seasons': string[];
  'episode': EpisodeSeriesDto[] | null;
}
