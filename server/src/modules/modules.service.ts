import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Modules, ModulesDocument } from './modules.schema';
import { ModulesDto } from './dto/modules.dto';
import { Movies, MoviesDocument } from 'src/movies/movies.schema';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules.name) private modulesModel: Model<ModulesDocument>,
    @InjectModel(Movies.name) private moviesModel: Model<MoviesDocument>,
  ) {}

  async get() {
    return this.modulesModel.find();
  }

  async findByModule(module: string) {
    return this.moviesModel.find({ module }).sort({ timeline: -1 });
  }

  async create(dto: ModulesDto) {
    await this.modulesModel.create(dto);
    return 'success';
  }

//   async update(id: string, dto: ModulesDto) {
//     this.modulesModel.findByIdAndUpdate(id, dto, { new: true });
//     return 'success';
//   }

//   async remove(id: string) {
//     this.modulesModel.findByIdAndDelete(id);
//     return 'success';
//   }

}
