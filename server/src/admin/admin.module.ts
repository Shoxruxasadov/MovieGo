import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Movies, MoviesSchema } from '../movies/movies.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
