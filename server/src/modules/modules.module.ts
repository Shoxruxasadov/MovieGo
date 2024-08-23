import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { Movies, MoviesSchema } from 'src/movies/movies.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Modules, ModulesSchema } from './modules.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Modules.name, schema: ModulesSchema }]),
    MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
