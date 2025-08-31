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

  async getUsers() {
    return await this.usersModel.find();
  }

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

  async getById(_id: string) {
    return this.usersModel.findOne({ _id });
  }

  async getByGoogle(email: string, name: string, image: string) {
    const user = await this.usersModel.findOne({ email: email });
    if (user) return user;

    const dto = {
      name: name,
      email: email,
      login: 'google',
      role: 'user',
      image: image,
    };
    const createdUser = await this.usersModel.create(dto);
    return createdUser.save();
  }

  async create(dto: UsersDto): Promise<Users> {
    const user = await this.usersModel.findOne(
      dto.email ? { email: dto.email } : { phone: dto.phone },
    );
    if (user)
      throw new HttpException(
        'User available',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const createdUser = await this.usersModel.create(dto);
    return createdUser.save();
  }

  async updateGoogleUser(_id: string, name: string, image: string) {
    return await this.usersModel.findByIdAndUpdate({ _id }, {name, image}, { new: true });
  }
}
