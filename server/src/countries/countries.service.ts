import { Injectable } from '@nestjs/common';
import { CountriesDto } from './dto/countries.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Countries, CountriesDocument } from './countries.schema';

@Injectable()
export class CountriesService {
   constructor(
      @InjectModel(Countries.name) private countriesModel: Model<CountriesDocument>,
    ) {}

  async get() {
    return this.countriesModel.find();
  }

  async getById(id: any) {
    return this.countriesModel.findOne({ id })
  }

  async create(dto: CountriesDto) {
    await this.countriesModel.create(dto);
    return 'success';
  }
}
