/**
 * Dejar de usar la lista de salas de socket io y usarlas con el state de react
 * crear channels privados
 */


import React, {
  Component
} from 'react';
import socket, {
  setNickname,
  subscribeNewUser,
  setMessage,
  subscribeNewMessage,
  subscribeNewChannel
} from './socket';
import {
  newUserMessage,
  newMessage
} from './messages';
import {
  newChannel,
  changeChannel
} from './channels';
import Rooms from './components/Rooms';
import Messages from './components/Messages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChannel: {
        messages: [],
        name: 'general'
      },
      modalShow: true,
      username: '',
      message: '',
      channels: [{
        messages: [],
        name: 'general'
      }]
    };
    this.changeChannel = this.changeChannel.bind(this);
    subscribeNewUser(user => {
      const newMessages = newUserMessage({
        currentChannel: this.state.currentChannel,
        channels: this.state.channels,
        newMessage: user
      });
      this.setState({
        currentChannel: newMessages.currentChannel,
        channels: newMessages.channels
      });
    });
    subscribeNewMessage(message => {
      const newMessages = newMessage({
        currentChannel: this.state.currentChannel,
        channels: this.state.channels,
        newMessage: message
      });
      this.setState({
        currentChannel: newMessages.currentChannel,
        channels: newMessages.channels
      });
    });
    subscribeNewChannel(channel => {
      const newMessages = newChannel({
        currentChannel: this.state.currentChannel,
        channels: this.state.channels,
        newChannel: channel
      });
      this.setState({
        currentChannel: newMessages.currentChannel,
        channels: newMessages.channels
      });
    });
  }
  changeChannel(name) {
    const newMessages = changeChannel({
      currentChannel: this.state.currentChannel,
      channels: this.state.channels,
      nameChannel: name
    });
    this.setState({
      currentChannel: newMessages.currentChannel,
      channels: newMessages.channels
    });
  }
  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex'
          }}
          >
          <Rooms
            list={this.state.channels}
            current={this.state.currentChannel}
            onClick={this.changeChannel}
            />
          <Messages
            channel={this.state.currentChannel}
            />
        </div>
        <form
          action=""
          style={{
            background: '#000',
            padding: 3,
            position: 'fixed',
            display: 'flex',
            bottom: 0,
            width: '100%'
          }}
          onSubmit={(event) => {
            event.preventDefault();
            if (this.state.message !== '') {
              setMessage({
                id: socket.id,
                by: socket.nickname,
                body: this.state.message,
                channel: this.state.currentChannel.name
              });
              this.setState({
                message: ''
              });
            }
          }}
          >
          <input
            type="text"
            autoComplete="off"
            style={{
              border: 0,
              padding: 10,
              width: '88%',
              marginRight: '.5%'
            }}
            value={this.state.message}
            name="message"
            onChange={(event) => {
              this.setState({
                message: event.target.value
              })
            }}
            />
          <button
            style={{
              width: '9%',
              background: 'rgb(130, 224, 255)',
              border: 'none',
              padding: 10
            }}
            type="submit"
            >Send</button>
          <p
            id="typing"
            style={{
              color: '#fff'
            }}
            ></p>
        </form>
        <div
          id="modal-nickname"
          style={{
            transition: 'all .5s',
            padding: '19% 0',
            backgroundColor: 'rgba(0, 0, 0, .5)',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            textAlign: 'center',
            display: this.state.modalShow ? 'inline-block' : 'none'
          }}>
          <div
            style={{
              backgroundColor: '#fff',
              opacity: 1,
              display: 'inline-block',
              verticalAlign: 'middle',
              textAlign: 'left',
              position: 'relative'
            }}>
            <h4
              style={{
                paddingLeft: 5
              }}>Type your nickname</h4>
            <form
              action=""
              id='form-nickname'
              style={{
                padding: 5
              }}
              onSubmit={(event) => {
                event.preventDefault();
                if (this.state.username !== '') {
                  setNickname({
                    name: this.state.username,
                    channel: this.state.currentChannel.name
                  });
                  this.setState({
                    modalShow: false
                  });
                }
              }}
              >
              <input
                type="text"
                autoComplete="off"
                id="nickname"
                name="nickname"
                value={this.state.username}
                onChange={(event) => {
                  this.setState({
                    username: event.target.value
                  })
                }}
                />
              <button
                type="submit"
                >Go</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;