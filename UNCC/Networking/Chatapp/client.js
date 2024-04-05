const net = require("node:net");
const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;

const socket = net.createConnection(
  { port: 3000, host: "127.0.0.1" },
  async () => {
    console.log("Connected to the server");

    const ask = async function () {
      const message = await rl.question("Enter a message > ");
      //move cursor one line up
      // console.log();
      await moveCursor(0, -1);
      await clearLine(0);
      socket.write(JSON.stringify({ id, message }));
    };

    // ask();

    socket.on("data", async (data) => {
      data = data.toString("utf-8");
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);

      if (data.substring(0, 2) === "id") {
        //handling id of user
        id = data.substring(3);
        console.log(`Your id is ${id}\n`);
      } else {
        //handling message
        console.log(data);
      }
      ask();
    });
  }
);

socket.on("end", () => {
  console.log("Connection is ended");
});

socket.on("error", (e) => {
  console.log("Error !!!!", e);
});
