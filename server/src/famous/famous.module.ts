import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Famous, FamousSchema } from './famous.schema';
import { FamousController } from './famous.controller';
import { FamousService } from './famous.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Famous.name, schema: FamousSchema }]),
  ],
  controllers: [FamousController],
  providers: [FamousService],
})
export class FamousModule {}
