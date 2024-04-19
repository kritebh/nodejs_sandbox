const path = require("path");
const utils = require("../utils/index");
const fs = require("node:fs/promises");
const { pipeline } = require("node:stream/promises");
const DB = require("../DB");
const FF = require("../utils/FF");
const cluster = require("node:cluster");
const JobQueue = require("../utils/jobQueue");

let jobs;
if (cluster.isPrimary) {
  jobs = new JobQueue();
}

const getVideos = (req, res, handleErr) => {
  // const name = req.params.get("name");
  // if (name) {
  //   res.json({ message: name });
  // } else {
  //
  // }

  DB.update();
  const videos = DB.video.filter((video) => {
    return video.userId === req.userId;
  });

  res.status(200).json({ videos });
};

const uploadVideo = async (req, res, handleErr) => {
  const specifiedFilename = req.headers.filename;
  const extension = path.extname(specifiedFilename).substring(1).toLowerCase();
  const name = path.parse(specifiedFilename).name;
  const videoId = utils.randomVideoId();
  const videoDir = `./storage/${videoId}`;

  try {
    await fs.mkdir(videoDir);
    const fullPath = `${videoDir}/original.${extension}`;

    const file = await fs.open(fullPath, "w");
    const fileStream = file.createWriteStream();

    await pipeline(req, fileStream);

    //make thumbnail
    let thumbnailPath = videoDir + "/thumbnail.jpg";

    await FF.createThumbnail(fullPath, thumbnailPath);
    let dimensions = await FF.getDimensions(fullPath);

    DB.update();
    DB.video.unshift({
      id: DB.video.length,
      videoId,
      name,
      extension,
      dimensions,
      userId: req.userId,
      extractedAudio: false,
      resizes: {},
    });
    DB.save();
    res.status(201).json({
      status: "success",
      message: "The file was uploaded successfully",
    });
  } catch (err) {
    utils.deleteFolder(videoDir);
    if (err.code !== "ECONNRESET") return handleErr(err);
  }
};

const getVideoAsset = async (req, res, handleErr) => {
  const videoId = req.params.get("videoId");
  const type = req.params.get("type");

  DB.update();
  const video = DB.video.find((video) => video.videoId === videoId);

  if (!video) {
    return handleErr({ status: 400, message: "Video id is required" });
  }

  let file, mimeType, filename;

  switch (type) {
    case "thumbnail":
      let thumbnailPath = `./storage/${videoId}/${type}.jpg`;
      file = await fs.open(thumbnailPath, "r");
      mimeType = "image/jpeg";
      break;

    case "audio":
      file = await fs.open(`./storage/${videoId}/audio.aac`, "r");
      mimeType = "audio/aac";
      filename = `${video.name}-audio.aac`;
      break;

    case "resize":
      const dimensions = req.params.get("dimensions");
      file = await fs.open(
        `./storage/${videoId}/${dimensions}.${video.extension}`,
        "r"
      );
      mimeType = "video/mp4";
      filename = `${video.name}-${dimensions}.${video.extension}`;
      break;
    case "original":
      file = await fs.open(
        `./storage/${videoId}/original.${video.extension}`,
        "r"
      );
      mimeType = "video/mp4";
      filename = `${video.name}.${video.extension}`;
      break;
    default:
      break;
  }

  const stat = await file.stat();
  const fileStream = file.createReadStream();

  if (type !== "thumbnail") {
    res.setHeader("Content-Disposition", `attachment;filename=${filename}`);
  }

  res.setHeader("Content-Type", mimeType);
  res.setHeader("Content-Length", stat.size);
  res.status(200);
  await pipeline(fileStream, res);
  file.close();
};

const extractAudio = async (req, res, handleErr) => {
  const videoId = req.params.get("videoId");
  DB.update();

  const video = DB.video.find((video) => video.videoId === videoId);

  if (video.extractedAudio) {
    return handleErr({
      status: 400,
      message: "The audio has already been extracted for this video",
    });
  }
  const originalVideoPath = `./storage/${videoId}/original.${video.extension}`;
  const targetAudioPath = `./storage/${videoId}/audio.aac`;

  try {
    await FF.extractAudio(originalVideoPath, targetAudioPath);

    video.extractedAudio = true;
    DB.save();

    res.status(200).json({
      status: "success",
      message: "Audio extracted successfully",
    });
  } catch (error) {
    utils.deleteFile(targetAudioPath);
    return handleErr(error);
  }
};

const resizeVideo = async (req, res, handleErr) => {
  const videoId = req.body.videoId;
  const width = Number(req.body.width);
  const height = Number(req.body.height);

  DB.update();
  const video = DB.video.find((video) => video.videoId === videoId);

  video.resizes[`${width}x${height}`] = { processing: true };
  DB.save();

  // handlung cluster if onely one cpu is present
  if (cluster.isPrimary) {
    jobs.enqueue({
      type: "resize",
      videoId,
      width,
      height,
    });
  } else {
    process.send({
      messageType: "new-resize",
      data: { videoId, width, height },
    });
  }

  res.status(200).json({
    status: "success",
    message: "Video is processing now",
  });
};

const controller = {
  getVideos,
  uploadVideo,
  getVideoAsset,
  extractAudio,
  resizeVideo,
};

module.exports = controller;
