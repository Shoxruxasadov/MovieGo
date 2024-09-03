import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsDto } from './dto/actors.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @HttpCode(200)
  @Get()
  async getAll() {
    return this.actorsService.getAll();
  }

  @HttpCode(200)
  @Get(':name')
  async findByName(@Param('name') name: string) {
    return this.actorsService.findByName(name);
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.actorsService.findById(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: ActorsDto) {
    return this.actorsService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ActorsDto) {
    return this.actorsService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.actorsService.remove(id);
  }
}