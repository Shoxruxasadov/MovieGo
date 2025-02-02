import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StreamService } from './stream.service';
import path from 'path';

@Controller('live')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get(':name')
  async startStream(
    @Param('name') name: string,
    @Query('movieUrl') movieUrl: string,
  ) {
    return await this.streamService.liveStream(movieUrl, name);
  }

  @Get('test/:name')
  async test(@Param('name') name: string) {
    const outputDir = path.join(__dirname, 'public', 'movies');
    const outputFile = path.join(outputDir, `${name}.m3u8`);

    return {
      __dirname,
      outputDir,
      outputFile,
    };
  }
}
