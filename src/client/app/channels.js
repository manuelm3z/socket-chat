import socket from './socket';

export function newChannel({currentChannel, channels, newChannel}) {
  let newChannels = channels;
  if (socket.id === newChannel.socketId) {
    if (channels.findIndex(channel => {
      return channel.name === newChannel.name;
    }) == -1) {
      newChannels = channels.map(channel => {
        if (channel.name === currentChannel.name) {
          channel.messages = currentChannel.messages;
        }
        return channel;
      });
      newChannels.push({
        name: newChannel.name,
        messages: []
      });
      currentChannel = {
        name: newChannel.name,
        messages: []
      };
    }
  } else {
    newChannels.push({
      name: newChannel.name,
      messages: []
    });
  }
  return {
    currentChannel,
    channels: newChannels
  };
}

export function changeChannel({currentChannel, channels, nameChannel}) {
  let newChannels = channels.map(channel => {
    if (channel.name === currentChannel.name) {
      channel.messages = currentChannel.messages;
    }
    return channel;
  });
  newChannels.forEach(channel => {
    if (channel.name === nameChannel) {
      currentChannel = channel;
    }
  });
  return {
    currentChannel,
    channels: newChannels
  };
}