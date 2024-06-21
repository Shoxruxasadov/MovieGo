import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesDto } from './dto/movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @HttpCode(200)
  @Get()
  async findAll() {
    return this.moviesService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.moviesService.findById(+id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: MoviesDto) {
    return this.moviesService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: MoviesDto) {
    return this.moviesService.update(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
