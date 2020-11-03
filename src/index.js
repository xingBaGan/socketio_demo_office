const content = require("fs").readFileSync(__dirname + "/index.html", "utf8");
var httpServer = require("http").createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(content));
  res.end(content);
});

//create a server object:
const io = require("socket.io")(httpServer);

io.on("connect", (socket) => {
  console.log(" a user connect");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("go to http://localhost:3000");
});
