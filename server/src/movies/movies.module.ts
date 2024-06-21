import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movies, MoviesSchema } from './movies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
