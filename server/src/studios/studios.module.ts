import { Module } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { StudiosController } from './studios.controller';
import { Movies, MoviesSchema } from 'src/movies/movies.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Studios, StudiosSchema } from './studios.schema';
import { Famous, FamousSchema } from 'src/famous/famous.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Studios.name, schema: StudiosSchema }]),
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
    MongooseModule.forFeature([{ name: Famous.name, schema: FamousSchema }]),
  ],
  controllers: [StudiosController],
  providers: [StudiosService],
})
export class StudiosModule {}
