import React, {
  Component
} from 'react';

class Messages extends Component {
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 63px)',
          overflowX: 'auto',
          paddingLeft: 10
        }}
        >
        <div>
          <h2
            style={{
              marginTop: 0,
              marginBottom: 5
            }}
            >{this.props.channel.name}</h2>
        </div>
        <ul
          id="messages"
          style={{
            listStyleType: 'none',
            margin: 0,
            padding: 0,
            width: '90%',
            display: 'inline-block'
          }}
          >{this.props.channel.messages.map((item, key) => {
            return (
              <li
                style={item.type === 'user-conected' ? {
                  backgroundColor: '#eee'
                } : {
                  padding: '5px 10px'
                }}
                key={item.id}
                >{item.type === 'user-conected' ?
                  item.socketId == item.userId ?
                    `You connected as ${item.name}`
                    : `${item.name} is now connected`
                  : item.type === 'chat-message' ?
                    `${item.by}: ${item.body}`
                    : item.text}</li>
            );
        })}</ul>
      </div>
    );
  }
}

export default Messages;