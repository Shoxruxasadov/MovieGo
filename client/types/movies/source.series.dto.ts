import LangDto from "./lang.dto";
import MovieDto from "./movie.dto";

export default interface SourceSeriesDto {
  title: LangDto;
  duration: number;
  preview: string;
  video: MovieDto | null;
}
