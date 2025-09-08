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
  Headers,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesDto } from './dto/movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @HttpCode(200)
  @Get()
  async getData(@Query('page') page: number, @Headers('module') module: string) {
    return this.moviesService.getMovies(page, module);
  }
  
  @HttpCode(200)
  @Get('random')
  async findRandom(@Query('count') count: number) {
    return this.moviesService.findRandom(count);
  }

  @HttpCode(200)
  @Get(':path')
  async findByName(@Param('path') path: string) {
    return this.moviesService.findByPath(path);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: MoviesDto) {
    return this.moviesService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: MoviesDto) {
    return this.moviesService.update(id, dto);
  }

  // @HttpCode(200)
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.moviesService.remove(id);
  // }
}
