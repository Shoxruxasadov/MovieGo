import LangDto from "./lang.dto";
import MovieDto from "./movie.dto";

export default interface EpisodeSeriesDto {
  title: LangDto;
  duration: number;
  preview: string;
  watching: MovieDto | null;
}
