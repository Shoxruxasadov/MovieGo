import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesDto } from './dto/countries.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @HttpCode(200)
  @Get()
  getAll() {
    return this.countriesService.get();
  }

  @HttpCode(200)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.countriesService.getById(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() data: CountriesDto) {
    return this.countriesService.create(data);
  }
}
