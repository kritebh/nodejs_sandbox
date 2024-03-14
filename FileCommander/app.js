const fs = require("node:fs/promises");

(async () => {
  const createFile = async (path) => {
    try {
      const existingFile = await fs.open(path, "r");
      existingFile.close();
      console.error("File already exist");
      return;
    } catch (error) {
      let newFile = await fs.open(path, "w");
      console.log("File created successfully");
      newFile.close();
    }
  };

  const CREATE_FILE = "create a file";

  const commandFile = await fs.open("./command.txt", "r");
  commandFile.on("change", async () => {
    const size = (await commandFile.stat()).size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = size;
    const position = 0;

    await commandFile.read(buff, offset, length, position);
    let command = buff.toString("utf-8");

    //handling create file command

    if (command.includes(CREATE_FILE)) {
      let path = command.split(" ")[3];
      console.log(path);
      createFile(path);
    }
  });

  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFile.emit("change");
    }
  }
})();
