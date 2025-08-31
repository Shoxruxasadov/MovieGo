import { Injectable } from '@nestjs/common';
import { GenreDto } from './dto/genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genres, GenresDocument } from './genres.schema';

@Injectable()
export class GenresService {
  constructor(
      @InjectModel(Genres.name) private genresModel: Model<GenresDocument>,
    ) {}

  async get() {
    return this.genresModel.find();
  }

  async getById(id: any) {
    return this.genresModel.findOne({ id })
  }

  async create(dto: GenreDto) {
    await this.genresModel.create(dto);
    return 'success';
  }
}
