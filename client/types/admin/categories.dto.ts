import LangDto from "../movies/lang.dto";

export default interface CategoriesDto {
  _id: string;
  path: string;
  title: LangDto;
  image: string;
  createdAt: string;
  updatedAt: string;  
  __v: number;
}
