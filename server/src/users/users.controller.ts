import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { SocketGateway } from 'src/gateways/socket.gateway';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly socketGateway: SocketGateway,
  ) {}
// localhost:3000/api/users/login
  @HttpCode(200)
  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    const onlineUserIds = this.socketGateway.getOnlineUsers();
    return users.map((user) => ({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      login: user.login,
      role: user.role,
      gender: user.gender,
      country: user.country,
      birthday: user.birthday,
      image: user.image,
      isOnline: onlineUserIds.includes(user._id.toString()),
    }));
  }

  @HttpCode(200)
  @Get('login')
  async get(
    @Headers('email') email: string,
    @Headers('password') password: string,
  ) {
    return this.usersService.get(email, password);
  }

  @HttpCode(200)
  @Get('id')
  async getById(@Headers('id') id: string) {
    return this.usersService.getById(id);
  }

  @HttpCode(200)
  @Get('google')
  async getByGoogle(
    @Headers('email') email: string,
    @Headers('name') name: string,
    @Headers('image') image: string,
  ) {
    return this.usersService.getByGoogle(email, name, image);
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: UsersDto) {
    return this.usersService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async updateGoogleUser(
    @Param('id') id: string,
    @Body() {name, image}: {name: string, image: string}
  ) {
    return this.usersService.updateGoogleUser(id, name, image);
  }
}
