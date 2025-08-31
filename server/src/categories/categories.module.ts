import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categories, CategoriesSchema } from './categories.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
