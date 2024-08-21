import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Actors, ActorsSchema } from './actors.schema';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Actors.name, schema: ActorsSchema }]),
  ],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
