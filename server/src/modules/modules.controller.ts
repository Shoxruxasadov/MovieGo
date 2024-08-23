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
import { ModulesService } from './modules.service';
import { ModulesDto } from './dto/modules.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @HttpCode(200)
  @Get()
  async get() {
    return this.modulesService.get();
  }

  @HttpCode(200)
  @Get(':module')
  async findByName(@Param('module') module: string) {
    return this.modulesService.findByModule(module);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: ModulesDto) {
    return this.modulesService.create(dto);
  }

  // @HttpCode(200)
  // @Put(':id')
  // async update(@Param('id') id: string, @Body() dto: ModulesDto) {
  //   return this.modulesService.update(id, dto);
  // }

  // @HttpCode(200)
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.modulesService.remove(id);
  // }
}
