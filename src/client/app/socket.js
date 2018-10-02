import io from 'socket.io-client';
var socket = io('http://localhost:8080');

export default socket;

export function setNickname(user) {
  socket.nickname = user.name;
  socket.emit('new-user-conected', {
    id: socket.id,
    name: socket.nickname,
    channel: user.channel
  });
}

export function subscribeNewUser(cb) {
  socket.on('user-conected', user => cb(user));
}

export function setMessage(message) {
  socket.emit('new-chat-message', message);
}

export function subscribeNewMessage(cb) {
  socket.on('chat-message', message => cb(message));
}

export function subscribeRefreshChannels(cb) {
  socket.on('refresh-channels', list => {
    const names = Object.keys(list).filter(name => {
      return name !== socket.id;
    });
    cb(names);
  });
}

export function setNewChannel(name) {
  socket.emit('join-chat-room', {
    name,
    socketId: socket.id
  });
}

export function subscribeNewChannel(cb) {
  socket.on('new-channel', channel => cb(channel));
}