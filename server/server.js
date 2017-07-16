const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMsg', {
    text: "Welcome to chat app!",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMsg', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMsg', (createMsg) => {
    console.log('Created Msg', createMsg);
    io.emit('newMsg', {
      from: createMsg.from,
      text: createMsg.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMsg', {
    //   from: createMsg.from,
    //   text: createMsg.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

});






server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
