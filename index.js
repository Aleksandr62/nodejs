const socket = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  readStream.pipe(res);
});
const io = socket(server);
let usersOnline = new Map()

io.on("connection", (client) => {
  client.join("room1");

  client.on("client-connect", ({ userName }) => {
    usersOnline.set(client.id, userName)
    const data = {
      userName,
      users: usersOnline.size,
      status: 'connect',
      message: `User ${userName} come in the chat`,
    };
    client.broadcast.emit("server-msg", data);
    client.emit("server-msg", data);
  })

  client.on("client-msg", ({ userName, message }) => {
    const data = {
      userName,
      users: usersOnline.size,
      status: 'message',
      message: `${message}`,
    };
    client.broadcast.emit("server-msg", data);
    client.emit("server-msg", data);
  });

  client.on('disconnect', () => {
    const userName = usersOnline.get(client.id)
    usersOnline.delete(client.id)

    const data = {
      userName,
      users: usersOnline.size,
      status: 'disconnect',
      message: `User ${userName} disconnect`,
    };
    client.broadcast.emit("server-msg", data);
  });
});

server.listen(5555);
