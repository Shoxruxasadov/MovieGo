import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cast, CastDocument } from './cast.schema';
import { CastDto } from './dto/cast.dto';

@Injectable()
export class CastService {
  constructor(
    @InjectModel(Cast.name) private castModel: Model<CastDocument>,
  ) {}

  async getAll() {
    return this.castModel.find()
  }

  async findByName(name: string) {
    return this.castModel.findOne({ name });
  }

  async findById(id: string) {
    return this.castModel.findOne({ _id: id });
  }

  async create(dto: CastDto) {
    this.castModel.create(dto);
    return 'success';
  }

  async update(id: string, dto: CastDto) {
    await this.castModel.findByIdAndUpdate(id, dto, { new: true });
    return 'success';
  }

  async remove(id: string) {
    await this.castModel.findByIdAndDelete(id);
    return 'success';
  }
}