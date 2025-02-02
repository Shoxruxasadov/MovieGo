import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Fayllarni saqlash joyi
    }),
  ],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
