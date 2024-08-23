import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users, UsersDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async get(email: string, password: string) {
    const user = await this.usersModel.findOne({ email: email });

    if (user.password != password) {
      throw new HttpException(
        'Password wrong!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  async getById(id: string) {
    return this.usersModel.findOne({ _id: id });
  }

  async getByGoogle(email: string, name: string, image: string) {
    const user = await this.usersModel.findOne({ email: email });
    if (user) return user;

    const dto = { name: name, email: email, password: image.substring(36, 44), image: image };
    const createdUser = await this.usersModel.create(dto);
    return createdUser.save();
  }

  async create(dto: UsersDto): Promise<Users> {
    const user = await this.usersModel.findOne({ email: dto.email });

    if (user) {
      throw new HttpException(
        'Email is already token',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createdUser = await this.usersModel.create(dto);
    return createdUser.save();
  }
}
