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
import { CastService } from './cast.service';
import { CastDto } from './dto/cast.dto';

@Controller('cast')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @HttpCode(200)
  @Get()
  async getAll() {
    return this.castService.getAll();
  }

  @HttpCode(200)
  @Get(':name')
  async findByName(@Param('name') name: string) {
    return this.castService.findByName(name);
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.castService.findById(id);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: CastDto) {
    return this.castService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CastDto) {
    return this.castService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.castService.remove(id);
  }
}