import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Studios, StudiosDocument } from './studios.schema';
import { StudiosDto } from './dto/studios.dto';
import { Movies, MoviesDocument } from 'src/movies/movies.schema';
import { Famous, FamousDocument } from 'src/famous/famous.schema';

@Injectable()
export class StudiosService {
  constructor(
    @InjectModel(Studios.name) private studiosModel: Model<StudiosDocument>,
    @InjectModel(Movies.name) private moviesModel: Model<MoviesDocument>,
    @InjectModel(Famous.name) private famousModel: Model<FamousDocument>,
  ) {}

  async get() {
    return this.studiosModel.find();
  }

  async findByModule(module: string) {
    const marvel = await this.moviesModel
      .find({ module })
      .populate('studio')
      .sort({ timeline: -1 });
    const famous = await this.famousModel
      .find({ module })
      .populate('studio')
      .sort({ timeline: -1 });

    const all = marvel.concat(famous);

    return all;
  }

  async create(dto: StudiosDto) {
    await this.studiosModel.create(dto);
    return 'success';
  }

  async update(id: string, dto: StudiosDto) {
    await this.studiosModel.findByIdAndUpdate(id, dto, { new: true });
    return 'success';
  }

  //   async remove(id: string) {
  //     await this.studiosModel.findByIdAndDelete(id);
  //     return 'success';
  //   }
}
