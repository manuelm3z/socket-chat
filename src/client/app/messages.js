import socket from './socket';

export function newUserMessage({currentChannel, channels, newMessage}) {
  let newChannels = channels;
  if (newMessage.channel === currentChannel.name) {
    currentChannel.messages.push({
      socketId: newMessage.id,
      userId: socket.id,
      name: newMessage.name,
      type: 'user-conected',
      id: new Date().getTime()
    });
  } else {
    newChannels = channels.map(channel => {
      if (channel.name === newMessage.channel) {
        channel.messages.push({
          socketId: newMessage.id,
          userId: socket.id,
          name: newMessage.name,
          type: 'user-conected',
          id: new Date().getTime()
        });
      }
      return channel;
    });
  }
  return {
    currentChannel,
    channels: newChannels
  };
}

export function newMessage({currentChannel, channels, newMessage}) {
  let newChannels = channels;
  if (newMessage.channel === currentChannel.name) {
    currentChannel.messages.push({
      socketId: newMessage.id,
      userId: socket.id,
      by: newMessage.by,
      body: newMessage.body,
      type: 'chat-message',
      id: new Date().getTime()
    });
  } else {
    newChannels = channels.map(channel => {
      if (channel.name === newMessage.channel) {
        channel.messages.push({
          socketId: newMessage.id,
          userId: socket.id,
          by: newMessage.by,
          body: newMessage.body,
          type: 'chat-message',
          id: new Date().getTime()
        });
      }
      return channel;
    });
  }
  return {
    currentChannel,
    channels: newChannels
  };
}