import { Injectable } from '@nestjs/common';
import { MoviesDto } from './dto/movies.dto';
import { Movies, MoviesDocument } from './movies.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name) private moviesModel: Model<MoviesDocument>,
  ) {}

  async findByType(type: string) {
    return this.moviesModel.find({ type: type }).sort({"createdAt": -1}) 
  }

  async findByName(name: string) {
    return this.moviesModel.findOne({ name });
  }

  async create(dto: MoviesDto) {
    this.moviesModel.create(dto);
    return 'success';
  }

  async update(id: number, dto: MoviesDto) {
    this.moviesModel.findByIdAndUpdate(id, dto, { new: true });
    return 'success';
  }

  async remove(id: number) {
    this.moviesModel.findByIdAndDelete(id);
    return 'success';
  }
}
