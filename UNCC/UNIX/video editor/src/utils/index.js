const crypto = require("node:crypto");
const fs = require("node:fs/promises");

const randomVideoId = () => {
  return crypto.randomBytes(4).toString("hex");
};

const deleteFolder = async (path) => {
  try {
    await fs.rm(path, { recursive: true });
  } catch (error) {
    console.log("Error during deleting Folder", error);
  }
};

const deleteFile = async (path) => {
  try {
    await fs.unlink(path);
  } catch (error) {
    console.log("Error during deleting Folder", error);
  }
};


const utils = {
  randomVideoId,
  deleteFile,
  deleteFolder,
};

module.exports = utils;
