const { spawn } = require("node:child_process");

const createThumbnail = (videoPath, thumbnailPath) => {
  let ffmpeg = spawn("ffmpeg", [
    "-i",
    videoPath,
    "-ss",
    5,
    "-vframes",
    1,
    thumbnailPath,
  ]);

  return new Promise((resolve, reject) => {
    ffmpeg.on("error", (err) => {
      reject(err);
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve("thumbnail created");
      } else {
        reject("error");
      }
    });

    ffmpeg.stderr.on("data", (err) => {
      //   console.log(`stderr : ${err}`);
    });
  });
};

const getDimensions = (videoPath) => {
  const ffprobe = spawn("ffprobe", [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height",
    "-of",
    "csv=p=0",
    videoPath,
  ]);

  let dimension = "";
  ffprobe.stdout.on("data", (data) => {
    dimension += data.toString("utf-8");
  });

  return new Promise((resolve, reject) => {
    ffprobe.on("close", (code) => {
      if (code === 0) {
        let [width, height] = dimension.split(",");
        resolve({ height: Number(height), width: Number(width) });
      } else {
        reject("Error happened with code", code);
      }
    });
  });
};

const extractAudio = (originalVideoPath, targetAudioPath) => {
  let ffmpeg = spawn("ffmpeg", [
    "-i",
    originalVideoPath,
    "-vn",
    "-c:a",
    "copy",
    targetAudioPath,
  ]);

  return new Promise((resolve, reject) => {
    ffmpeg.on("error", (err) => {
      reject(err);
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve("Audio extraced successfully");
      } else {
        reject("error");
      }
    });

    ffmpeg.stderr.on("data", (err) => {
      //   console.log(`stderr : ${err}`);
    });
  });
};

const resize = (originalVideoPath, targetVideoPath, width, height) => {
  let ffmpeg = spawn("ffmpeg", [
    "-i",
    originalVideoPath,
    "-vf",
    `scale=${width}:${height}`,
    "-c:a",
    "copy",
    "-y",
    targetVideoPath,
  ]);

  return new Promise((resolve, reject) => {
    ffmpeg.on("error", (err) => {
      reject(err);
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve("Video processed");
      } else {
        reject("error");
      }
    });

    ffmpeg.stderr.on("data", (err) => {
      //   console.log(`stderr : ${err}`);
    });
  });
};

module.exports = { createThumbnail, getDimensions, extractAudio, resize };
