const http = require("http");
const path = require("path");
const fs = require("fs");
const postService = require("./post-service");

/* "foo/bar/baz".split(path.sep);
path.parse("C:\\path\\dir\\file.txt");
path.dirname(path); */

const PORT = 3000;
const pathFile = path.join(__dirname, "../client/index.html");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html");

    let readStream = fs.createReadStream(pathFile, { encoding: "utf-8" });
    readStream.pipe(res);
  } else if (req.method === "POST") {
    postService(req, res);
  } else {
    res.statusCode(405).end("Method Not Allowed");
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server start at ${PORT} port`);
});
