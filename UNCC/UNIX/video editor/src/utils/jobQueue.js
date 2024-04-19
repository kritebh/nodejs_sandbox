const DB = require("../DB");
const FF = require("../utils/FF");
const utils = require("../utils/index");

class JobQueue {
  constructor() {
    this.jobs = [];
    this.currentJob = null;

    DB.update();
    DB.video.forEach(element => {
      Object.keys(element.resizes).forEach((key) => {
        if (element.resizes[key].processing) {
          const [width, height] = key.split('x');
          this.enqueue({
            type: "resize",
            videoId: element.videoId,
            width,
            height
          })
        }
      })
    });


  }

  enqueue(job) {
    this.jobs.push(job);
    this.executeNext();
  }

  executeNext() {
    if (this.currentJob) return;
    this.currentJob = this.dequeue();
    if (this.currentJob) {
      this.execute(this.currentJob);
    }
  }

  dequeue() {
    return this.jobs.shift();
  }

  async execute(job) {
    if (job.type === "resize") {
      let { width, height, videoId } = job;
      DB.update();
      const video = DB.video.find((video) => video.videoId === videoId);

      const originalVideoPath = `./storage/${videoId}/original.${video.extension}`;
      const targetVideoPath = `./storage/${videoId}/${width}x${height}.${video.extension}`;

      try {
        await FF.resize(originalVideoPath, targetVideoPath, width, height);

        DB.update();
        const video = DB.video.find((video) => video.videoId === videoId);
        video.resizes[`${width}x${height}`].processing = false;
        DB.save();
      } catch (error) {
        utils.deleteFile(targetVideoPath);
      }
      this.currentJob = null;
      this.executeNext();
    }
  }
}

module.exports = JobQueue;
