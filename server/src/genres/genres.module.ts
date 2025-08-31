import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Genres, GenresSchema } from './genres.schema';

@Module({
   imports: [
      MongooseModule.forFeature([
        { name: Genres.name, schema: GenresSchema },
      ]),
    ],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
