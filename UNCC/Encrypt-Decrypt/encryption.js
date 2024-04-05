const { Transform } = require("node:stream");
const fs = require("node:fs/promises");
class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i]!==255) {
        chunk[i] = chunk[i] + 20;
      }
    }

    this.push(chunk);
  }
}

(async () => {
  let readFile = await fs.open("read.txt", "r");
  let writeFile = await fs.open("write.txt", "w");

  const readStream = readFile.createReadStream();
  const writeStream = writeFile.createWriteStream();

  const encrypt = new Encrypt();

  readStream.pipe(encrypt).pipe(writeStream);
})();
