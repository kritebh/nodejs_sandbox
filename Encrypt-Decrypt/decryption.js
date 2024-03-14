const { Transform } = require("node:stream");
const fs = require("node:fs/promises");
class Decrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i]) {
        chunk[i] = chunk[i] - 20;
      }
    }

    this.push(chunk);
  }
}

(async () => {
  let readFile = await fs.open("write.txt", "r");
  let writeFile = await fs.open("decrypted.txt", "w");

  const readStream = readFile.createReadStream();
  const writeStream = writeFile.createWriteStream();

  const encrypt = new Decrypt();

  readStream.pipe(encrypt).pipe(writeStream);
})();
