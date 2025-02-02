import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Movies, MoviesDocument } from './movies.schema';
import { MoviesDto } from './dto/movies.dto';

import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name) private moviesModel: Model<MoviesDocument>,
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
    return this.moviesModel.aggregate([
      { $sample: { size: 5 } },
      {
        $lookup: {
          from: 'studios',
          localField: 'studio',
          foreignField: '_id',
          as: 'studio',
        },
      },
    ]);
  }

  async findByUrl(url: string) {
    return this.moviesModel
      .findOne({ url })
      .populate('studio')
      .populate('genres')
      .populate('category')
      .populate('casts.cast')
      .populate('directors')
      .populate('producers')
      .populate('scenarists');
  }

  async create(dto: MoviesDto) {
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

  async getMovies(page: number) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    return this.moviesModel.aggregate([
      { $sample: { size: 1000 } },
      { $skip: skip },
      { $limit: pageSize },
    ]);
  }

  async searchByMovieTitle(query: string): Promise<Movies[]> {
    return this.moviesModel
      .find({
        $text: { $search: query },
      })
      .exec();
  }
}
