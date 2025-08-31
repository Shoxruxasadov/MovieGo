import LangDto from "./lang.dto";

export default interface GenresDto {
  _id: string;
  path: string;
  title: LangDto;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
