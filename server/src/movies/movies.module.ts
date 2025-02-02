import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Movies, MoviesSchema } from './movies.schema';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
