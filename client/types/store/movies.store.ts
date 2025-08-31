import LangDto from "../movies/lang.dto";
import MovieDto from "../movies/movies.dto";

export default interface MovieStore {
  movie: MovieDto | null;
  related: MovieDto[] | null;
  getMovie: (movieId: string) => Promise<void>;
  getRelated: () => Promise<void>;
}