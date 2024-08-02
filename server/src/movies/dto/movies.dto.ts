import { IsNotEmpty } from "class-validator";
import { LangDto } from "./lang.dto";
import { ImageDto } from "./image.dto";
import { FilmDto } from "./film.dto";
import { CastDto } from "./cast.dto";

export class MoviesDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    title: LangDto;

    @IsNotEmpty()
    description: LangDto;

    @IsNotEmpty()
    source: FilmDto[];

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    image: ImageDto;
    
    @IsNotEmpty()
    issue: string;

    @IsNotEmpty()
    event: string;

    @IsNotEmpty()
    module: string;

    @IsNotEmpty()
    manufacturer: string;

    @IsNotEmpty()
    income: string;

    @IsNotEmpty()
    expense: string;

    @IsNotEmpty()
    format: string;

    @IsNotEmpty()
    resolution: string;

    @IsNotEmpty()
    duration: number;

    @IsNotEmpty()
    certificate: string;

    @IsNotEmpty()
    genre: string[];

    @IsNotEmpty()
    languages: string[];

    @IsNotEmpty()
    made: string;

    @IsNotEmpty()
    admitted: number;

    @IsNotEmpty()
    cast: CastDto[];
    
    @IsNotEmpty()
    directors: string[];

    @IsNotEmpty()
    producers: string[];
    
    @IsNotEmpty()
    screenwriters: string[];
}