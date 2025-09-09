import EpisodeSeriesDto from "./episode.series.dto";

export default interface SourceSeriesDto {
  seasons: string[];
  episode: EpisodeSeriesDto[] | null;
}
