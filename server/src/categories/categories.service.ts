import { Injectable } from '@nestjs/common';
import { CategoriesDto } from './dto/categories.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from './categories.schema';

@Injectable()
export class CategoriesService {
   constructor(
      @InjectModel(Categories.name) private categoriesModel: Model<CategoriesDocument>,
    ) {}

  async get() {
    return this.categoriesModel.find();
  }

  async getById(id: any) {
    return this.categoriesModel.findOne({ id })
  }

  async create(dto: CategoriesDto) {
    await this.categoriesModel.create(dto);
    return 'success';
  }
}
