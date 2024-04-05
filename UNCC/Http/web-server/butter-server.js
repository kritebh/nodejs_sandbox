const Butter = require("./butter");

const server = new Butter();
const PORT = 3000;

server.route("GET", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});
server.route("GET", "/style.css", (req, res) => {
  res.sendFile("./public/style.css", "text/css");
});
server.route("GET", "/script.js", (req, res) => {
  res.sendFile("./public/script.js", "text/javascript");
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
