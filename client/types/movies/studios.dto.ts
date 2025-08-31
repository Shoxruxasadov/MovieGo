import LangDto from "./lang.dto";

export default interface StudiosDto {
  _id: string;
  path: string;
  title: LangDto;
  description?: LangDto | null;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
