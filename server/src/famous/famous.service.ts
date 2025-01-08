import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Famous, FamousDocument } from './famous.schema';
import { FamousDto } from './dto/famous.dto';

@Injectable()
export class FamousService {
  constructor(
    @InjectModel(Famous.name) private famousModel: Model<FamousDocument>,
  ) {}

  async findByType(type: string) {
    if (type == 'all') {
      return this.famousModel.find().populate('studio').sort({ timeline: -1 });
    } return this.famousModel
      .find({ type: type })
      .populate('studio')
      .sort({ timeline: -1 });
  }

  async findByName(name: string) {
    return this.famousModel
      .findOne({ name })
      .populate('studio')
      .populate('cast')
      .populate('directors')
      .populate('producers')
      .populate('screenwriters');
  }

  async create(dto: FamousDto) {
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

    await this.famousModel.create(dto);
    return 'success';
  }

  async update(id: string, dto: FamousDto) {
    await this.famousModel.findByIdAndUpdate(id, dto, { new: true });
    return 'success';
  }

  // async remove(id: string) {
  //   await this.famousModel.findByIdAndDelete(id);
  //   return 'success';
  // }
}
