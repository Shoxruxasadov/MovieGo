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

  async getStudios(page: number) {
    const pageSize = 10;
    const skip = page * pageSize;

    const studios = await this.studiosModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: pageSize },
    ]);

    return {
      data: studios,
      nextPage: Number(Number(page) + 1),
    };
  }

  async findMoviesByStudio(path: string, page: number) {
    const pageSize = 20;
    const skip = page * pageSize;
    const studios = await this.studiosModel.findOne({ path });

    const movies = await this.moviesModel.aggregate([
      // { $sample: { size: 1000 } },
      { $match: { studio: studios._id } },

      {
        $lookup: {
          from: 'studios',
          localField: 'studio',
          foreignField: '_id',
          as: 'studio',
        },
      },
      { $unwind: { path: '$studio', preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: 'countries',
          localField: 'country',
          foreignField: '_id',
          as: 'country',
        },
      },
      { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: 'genres',
          localField: 'genres',
          foreignField: '_id',
          as: 'genres',
        },
      },

      // sort, skip, limit
      { $sort: { timeline: -1 } },
      { $skip: skip },
      { $limit: pageSize },
    ]);

    return {
      data: movies,
      nextPage: Number(Number(page) + 1),
    };
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
