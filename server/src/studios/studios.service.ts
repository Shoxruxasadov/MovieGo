import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Studios, StudiosDocument } from './studios.schema';
import { StudiosDto } from './dto/studios.dto';
import { Movies, MoviesDocument } from 'src/movies/movies.schema';

@Injectable()
export class StudiosService {
  constructor(
    @InjectModel(Studios.name) private studiosModel: Model<StudiosDocument>,
    @InjectModel(Movies.name) private moviesModel: Model<MoviesDocument>,
  ) {}

  async get() {
    return this.studiosModel.find();
  }

  async findByModule(module: string) {
    return this.moviesModel.find({ module }).sort({ timeline: -1 });
  }

  async create(dto: StudiosDto) {
    await this.studiosModel.create(dto);
    return 'success';
  }

  async update(id: string, dto: StudiosDto) {
    this.studiosModel.findByIdAndUpdate(id, dto, { new: true });
    return 'success';
  }

//   async remove(id: string) {
//     this.studiosModel.findByIdAndDelete(id);
//     return 'success';
//   }

}
