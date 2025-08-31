import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { Countries, CountriesSchema } from './countries.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Countries.name, schema: CountriesSchema },
    ]),
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
