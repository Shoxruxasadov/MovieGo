import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  async get(@Headers('email') email: string, @Headers('password') password: string) {
    return this.usersService.get(email, password);
  }

  @HttpCode(200)
  @Get('id')
  async getById(@Headers('id') id: string) {
    return this.usersService.getById(id);
  }

  @HttpCode(200)
  @Get('google')
  async getByGoogle(@Headers('email') email: string, @Headers('name') name: string, @Headers('image') image: string) {
    return this.usersService.getByGoogle(email, name, image);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: UsersDto) {
    return this.usersService.create(dto);
  }
}
