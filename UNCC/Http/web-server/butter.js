const http = require("node:http");
const fs = require("node:fs/promises");
class Butter {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    this.server.on("request", (req, res) => {
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r");
        const fileStream = fileHandle.createReadStream();
        const stat = await fileHandle.stat();
        res.setHeader("Content-Type", mime);
        res.setHeader("Content-Length", stat.size);
        fileStream.pipe(res);
      };

      res.status = (statusCode) => {
        res.statusCode = statusCode;
        return res;
      };

      if (this.routes.hasOwnProperty(req.method.toLowerCase() + req.url)) {
        this.routes[req.method.toLowerCase() + req.url](req, res);
      } else {
        return res.status(404).end(`Cannot ${req.method} ${req.url}`);
      }
    });
  }

  listen = (port, cb) => {
    this.server.listen(port, () => {
      cb();
    });
  };

  route = (method, path, cb) => {
    this.routes[method.toLowerCase() + path] = cb;
  };
}

module.exports = Butter;
