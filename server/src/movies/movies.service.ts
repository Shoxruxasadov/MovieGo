import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Movies, MoviesDocument } from './movies.schema';
import { MoviesDto } from './dto/movies.dto';
import { log } from 'console';
import { Famous, FamousDocument } from 'src/famous/famous.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name) private moviesModel: Model<MoviesDocument>,
    @InjectModel(Famous.name) private famousModel: Model<FamousDocument>,
  ) {}

  async findByType(type: string) {
    if (type == 'all')
      return this.moviesModel.find().populate('studio').sort({ timeline: -1 });
    return this.moviesModel
      .find({ type: type })
      .populate('studio')
      .sort({ timeline: -1 });
  }

  async findRandom() {
    const marvel = await this.moviesModel.aggregate([
      { $sample: { size: 5 }, },
      { $lookup: {
          from: 'studios',
          localField: 'studio',
          foreignField: '_id',
          as: 'studio',
      }, },
    ]);

    const famous = await this.famousModel.aggregate([
      { $sample: { size: 5 }, },
      { $lookup: {
          from: 'studios',
          localField: 'studio',
          foreignField: '_id',
          as: 'studio',
      }, },
    ]);

    const random = marvel.concat(famous);
    return random;
  }

  async findByName(name: string) {
    const movie = await this.moviesModel
      .findOne({ name })
      .populate('studio')
      .populate('cast')
      .populate('directors')
      .populate('producers')
      .populate('screenwriters');

    if (!movie) {
      const famous = await this.famousModel
        .findOne({ name })
        .populate('studio')
        .populate('cast')
        .populate('directors')
        .populate('producers')
        .populate('screenwriters');
      return famous;
    }

    return movie;
  }

  async create(dto: MoviesDto) {
    dto.studio = new mongoose.Types.ObjectId(dto.studio);
    dto.cast = dto.cast.map((id: any) => new mongoose.Types.ObjectId(id));
    dto.directors = dto.directors.map(
      (id: any) => new mongoose.Types.ObjectId(id),
    );
    dto.producers = dto.producers.map(
      (id: any) => new mongoose.Types.ObjectId(id),
    );
    dto.screenwriters = dto.screenwriters.map(
      (id: any) => new mongoose.Types.ObjectId(id),
    );
    dto.release = new Date(dto.release).toISOString();
    dto.timeline = new Date(dto.timeline).toISOString();

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
