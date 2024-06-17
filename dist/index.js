"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = require("path");
const fs_1 = require("fs");
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
// Check if ffmpegPath is null and throw an error if it is
if (!ffmpeg_static_1.default) {
    throw new Error('FFmpeg binary not found, please ensure ffmpeg-static is installed correctly.');
}
// Set ffmpeg path
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
// Function to generate thumbnails
function generateThumbnails(videoPath, outputDir, interval = '1') {
    if (!(0, fs_1.existsSync)(outputDir)) {
        (0, fs_1.mkdirSync)(outputDir);
    }
    const outputFilePattern = (0, path_1.join)(outputDir, 'thumbnail-%04d.png');
    (0, fluent_ffmpeg_1.default)(videoPath)
        .outputOptions([
        `-vf fps=1/${interval}`, // Capture one frame every 'interval' seconds
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
// Example usage
const videoPath = './public/Video.mp4';
const outputDir = './Output';
generateThumbnails(videoPath, outputDir, '1'); // Generate thumbnails every second
