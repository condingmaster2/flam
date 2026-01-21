const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

let operations = [];

io.on('connection', (socket) => {
  socket.emit('sync', operations);

  socket.on('draw', (op) => {
    operations.push(op);
    socket.broadcast.emit('draw', op);
  });

  socket.on('undo', () => {
    operations.pop();
    io.emit('sync', operations);
  });
});

server.listen(3000, () => {
  console.log('Server running on 3000');
});
