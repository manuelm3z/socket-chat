const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on("connect", () => {
    socket.join('general');
  });

  socket.on('new-user-conected', user => {
    io.emit('user-conected', user);
  });

  socket.on('new-chat-message', msg => {
    io.emit('chat-message', msg);
  });

  socket.on('join-chat-room', channel => {
    io.emit('new-channel', channel);
  });

  socket.on('leave-chat-room', name => {
    socket.leave(name);
    io.emit('refresh-channels', socket.rooms);
  });

  socket.on('new-typing', user => {
    io.emit('typing', user);
  });

  socket.on('new-stop-typing', user => {
    io.emit('stop-typing', user);
  });

  socket.on('disconnect', () => {
    const clients = io.of('/').connected;
    let users = [];
    for (let user in clients) {
      users.push(user);
    }
    io.emit('user-disconnected', users);
  });
});

http.listen(8080, () => {
  console.log('listening on http://localhost:8080');
});