import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

   @HttpCode(200)
  @Get()
  getAll() {
    return this.genresService.get();
  }

  @HttpCode(200)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.genresService.getById(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() data: GenreDto) {
    return this.genresService.create(data);
  }
}
