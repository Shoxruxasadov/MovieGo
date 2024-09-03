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
  async get() {
    return this.studiosService.get();
  }

  @HttpCode(200)
  @Get(':module')
  async findByName(@Param('module') module: string) {
    return this.studiosService.findByModule(module);
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
