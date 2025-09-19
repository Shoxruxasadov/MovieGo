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

  async findRandom(count:number) {    
    return this.moviesModel.aggregate([
      { $sample: { size: Number(count) } },
      
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
    ]);
  }

  async findByPath(path: string) {
    return this.moviesModel
      .findOne({ path })
      .populate('studio')
      .populate('genres')
      .populate('category')
      .populate('country')
      .populate('cast.actor')
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

  async getMovies(page: number, module: string) {
    const pageSize = 10;
    const skip = page * pageSize;

    const movies = await this.moviesModel.aggregate([
      { $sample: { size: 1000 } },
      { $match: { module } },
    
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

  async searchByMovieTitle(query: string): Promise<Movies[]> {
    return this.moviesModel
      .find({
        $text: { $search: query },
      })
      .exec();
  }
}
