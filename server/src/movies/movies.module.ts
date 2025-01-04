import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Movies, MoviesSchema } from './movies.schema';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Famous, FamousSchema } from 'src/famous/famous.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
    MongooseModule.forFeature([{ name: Famous.name, schema: FamousSchema }]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
