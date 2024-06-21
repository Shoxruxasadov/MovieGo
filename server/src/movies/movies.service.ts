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

  findAll() {
    return this.moviesModel.find();
  }

  findById(id: number) {
    return this.moviesModel.findOne({ _id: id });
  }

  create(dto: MoviesDto) {
    this.moviesModel.create(dto);
  }

  update(id: number, dto: MoviesDto) {
    this.moviesModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: number) {
    this.moviesModel.findByIdAndDelete(id);
  }
}
