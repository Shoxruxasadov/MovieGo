import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const { spawn } = require('child_process');
// const execPromise = promisify(exec);

@Injectable()
export class StreamService {
  // 1️⃣ URL orqali direct streaming qo‘llab-quvvatlanishini tekshirish
  async checkDirectStreaming(movieUrl: string): Promise<boolean> {
    try {
      const response = await axios.head(movieUrl);
      return response.status === 200 || response.status === 206;
    } catch (error) {
      console.error('Direct streaming tekshiruvida xatolik:', error.message);
      return false;
    }
  }

  // 2️⃣ Agar direct stream ishlamasa, yuklab olib convert qilish
  async liveStream(movieUrl: string, name: string): Promise<string> {
    console.log('start');

    try {
      // Check Streaming Support
      const isDirect = await this.checkDirectStreaming(movieUrl);
      if (!isDirect) throw new Error('Direct streaming qo‘llab-quvvatlanmaydi, faylni yuklab olish kerak.');
      console.log('streaming qo‘llab-quvvatlatlaydi');

      // Check Available Folder Movies in Public
      const outputDir = path.join(__dirname, 'public', 'movies');
      const outputFile = path.join(outputDir, `${name}.m3u8`);
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
      console.log('katalog mavjud');

      // // Start Converting
      // // -map 0:v:0 -c:v copy // videoni convert emas copy qilish!
      // // -map 0:v -map 0:a // remove subtitle
      // // -map 0:s:0 -scodec webvtt output.vtt // convert subtitle to vtt
      // // -map 0:v -map 0:a -c:v copy -c:a aac -b:a 128k // convert audio to aac
      // const ffmpegCommand = `ffmpeg -i "${movieUrl}" -map 0:v -map 0:a -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls "${outputFile}"`;
      // console.log('ffmpegCommand jarayonda');
      // await execPromise(ffmpegCommand);
      // console.log('execPromise');

      return new Promise((resolve, reject) => {
        console.log('ffmpeg jarayonda');

        const args = [
          // // headers
          '-headers', 'User-Agent: Mozilla/5.0',
          // // movie url
          // '-re',
          '-i', movieUrl,
          // // remove vtt
          '-map', '0:v',
          '-map', '0:a',
          // // convert by copy
          '-codec:', 'copy',
          // '-start_number', '0',
          // // file hls
          '-f', 'hls',
          // // manage segments
          '-hls_time', '10',
          '-hls_list_size', '0', // 0 or 5
          // '-hls_flags', 'delete_segments',
          // // directory
          outputFile,
        ];

        const ffmpegProcess = spawn('ffmpeg', args);
        console.log('spawn');

        ffmpegProcess.stdout.on('data', (data) => { console.log(`STDOUT: ${data}`) });
        console.log('stdout');

        ffmpegProcess.stderr.on('data', (data) => { console.info(`STDERR: ${data}`) });
        console.log('stderr');

        ffmpegProcess.on('close', (code) => {
          if (code === 0) {
            resolve(`http://localhost:8080/movies/${name}.m3u8`);
          } else {
            reject(new Error(`ffmpeg process code ${code}`));
          }
        });
      });

      // Return Movie URL
      return `http://localhost:8080/movies/${name}.m3u8`;
      // return `https://server.moviego.uz/movies/${name}.m3u8`;
    } catch (error) {
      throw new Error(`Streaming xatolik: ${error.message}`);
    }
  }
}
