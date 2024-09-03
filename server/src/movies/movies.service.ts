import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Movies, MoviesDocument } from './movies.schema';
import { MoviesDto } from './dto/movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name) private moviesModel: Model<MoviesDocument>,
  ) {}

  async findByType(type: string) {
    return this.moviesModel.find({ type: type }).sort({ timeline: -1 });
  }

  async findRandom() {
    return this.moviesModel.aggregate([
      {$sample: {size: 10}}
    ]);
  }

  async findByName(name: string) {
    return this.moviesModel
      .findOne({ name })
      .populate('cast')
      .populate('directors')
      .populate('producers')
      .populate('screenwriters');
  }

  async create(dto: MoviesDto) {
    dto.cast = dto.cast.map((id: any) => new mongoose.Types.ObjectId(id));
    dto.directors = dto.directors.map((id: any) => new mongoose.Types.ObjectId(id));
    dto.producers = dto.producers.map((id: any) => new mongoose.Types.ObjectId(id));
    dto.screenwriters = dto.screenwriters.map((id: any) => new mongoose.Types.ObjectId(id));
    dto.release = (new Date(dto.release)).toISOString()
    dto.timeline = (new Date(dto.timeline)).toISOString()

    await this.moviesModel.create(dto);
    return 'success';
  }

  async update(id: string, dto: MoviesDto) {
    await this.moviesModel.findByIdAndUpdate(id, dto, { new: true });
    return 'success';
  }

  // async remove(id: string) {
  //   await this.moviesModel.findByIdAndDelete(id);
  //   return 'success';
  // }
}
