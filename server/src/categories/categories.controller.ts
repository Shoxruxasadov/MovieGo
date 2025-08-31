import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(200)
  @Get()
  getAll() {
    return this.categoriesService.get();
  }

  @HttpCode(200)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.categoriesService.getById(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() data: CategoriesDto) {
    return this.categoriesService.create(data);
  }
}
