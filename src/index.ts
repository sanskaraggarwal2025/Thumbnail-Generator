import ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import ffmpegPath from 'ffmpeg-static';


if (!ffmpegPath) {
 throw new Error('FFmpeg binary not found, please ensure ffmpeg-static is installed correctly.');
}


ffmpeg.setFfmpegPath(ffmpegPath);


function generateThumbnails(videoPath: string, outputDir: string, interval: string = '1') {
 if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
 }

 const outputFilePattern = join(outputDir, 'thumbnail-%04d.png');

 ffmpeg(videoPath)
  .outputOptions([
   `-vf fps=1/${interval}`,
  ])
  .output(outputFilePattern)
  .on('end', () => {
   console.log('Thumbnails generated successfully.');
  })
  .on('error', (err) => {
   console.error('Error generating thumbnails:', err);
  })
  .run();
}


const videoPath = './public/Video.mp4';
const outputDir = './Output';

generateThumbnails(videoPath, outputDir, '1');
