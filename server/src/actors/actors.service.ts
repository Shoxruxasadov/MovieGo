import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Actors, ActorsDocument } from './actors.schema';
import { ActorsDto } from './dto/actors.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel(Actors.name) private actorsModel: Model<ActorsDocument>,
  ) {}

  async getAll() {
    return this.actorsModel.find()
  }

  async findByName(name: string) {
    return this.actorsModel.findOne({ name });
  }

  async findById(id: string) {
    return this.actorsModel.findOne({ _id: id });
  }

  async create(dto: ActorsDto) {
    this.actorsModel.create(dto);
    return 'success';
  }

  async update(id: string, dto: ActorsDto) {
    await this.actorsModel.findByIdAndUpdate(id, dto, { new: true });
    return 'success';
  }

  async remove(id: string) {
    await this.actorsModel.findByIdAndDelete(id);
    return 'success';
  }
}