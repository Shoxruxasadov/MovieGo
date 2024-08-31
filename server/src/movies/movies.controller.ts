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
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesDto } from './dto/movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @HttpCode(200)
  @Get()
  async findByType(@Headers('type') type: string) {
    return this.moviesService.findByType(type);
  }
  
  @HttpCode(200)
  @Get('random')
  async findRandom() {
    return this.moviesService.findRandom();
  }

  @HttpCode(200)
  @Get(':name')
  async findByName(@Param('name') name: string) {
    return this.moviesService.findByName(name);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: MoviesDto) {
    return this.moviesService.create(dto);
  }

  // @HttpCode(200)
  // @Put(':id')
  // async update(@Param('id') id: string, @Body() dto: MoviesDto) {
  //   return this.moviesService.update(id, dto);
  // }

  // @HttpCode(200)
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.moviesService.remove(id);
  // }
}
