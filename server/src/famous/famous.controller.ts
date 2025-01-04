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
import { FamousService } from './famous.service';
import { FamousDto } from './dto/famous.dto';

@Controller('famous')
export class FamousController {
  constructor(private readonly famousService: FamousService) {}

  @HttpCode(200)
  @Get()
  async findByType(@Headers('type') type: string) {
    return this.famousService.findByType(type);
  }
  
  @HttpCode(200)
  @Get('random')
  async findRandom() {
    return this.famousService.findRandom();
  }

  @HttpCode(200)
  @Get(':name')
  async findByName(@Param('name') name: string) {
    return this.famousService.findByName(name);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: FamousDto) {
    return this.famousService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: FamousDto) {
    return this.famousService.update(id, dto);
  }

  // @HttpCode(200)
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.famousService.remove(id);
  // }
}
