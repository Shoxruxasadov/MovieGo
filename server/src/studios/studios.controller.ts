import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudiosService } from './studios.service';
import { StudiosDto } from './dto/studios.dto';

@Controller('studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @HttpCode(200)
  @Get()
  async get(@Query('page') page: number) {
    return this.studiosService.getStudios(page);
  }

  @HttpCode(200)
  @Get(':studio')
  async findMoviesByStudio(@Query('page') page: number, @Param('studio') studio: string) {
    return this.studiosService.findMoviesByStudio(studio, page);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: StudiosDto) {
    return this.studiosService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: StudiosDto) {
    return this.studiosService.update(id, dto);
  }

  // @HttpCode(200)
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.studiosService.remove(id);
  // }
}
