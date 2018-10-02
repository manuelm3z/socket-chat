import React, {
  Component
} from 'react';
import {
  setNewChannel
} from '../socket';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  render() {
    return (
      <div
        style={{
          width: 200,
          height: 'calc(100vh - 63px)',
          borderRight: '2px solid black'
        }}
        >
        <div>
          <h3
            style={{
              marginTop: 0,
              marginBottom: 5
            }}
            >Channels</h3>
        </div>
        <form
          style={{
            paddingBottom: 10,
            display: 'flex'
          }}
          onSubmit={(event) => {
            event.preventDefault();
            if (this.state.name !== '') {
              setNewChannel(this.state.name);
              this.setState({
                name: ''
              });
            }
          }}
          >
          <input
            type="text"
            name="name"
            autoComplete="false"
            placeholder="New Channel"
            value={this.state.name}
            onChange={(event) => {
              this.setState({
                name: event.target.value
              })
            }}
            />
          <button
            type="submit"
            >ok</button>
        </form>
        <ul
          style={{
            listStyleType: 'none',
            margin: 0,
            padding: 0,
            width: '90%',
            display: 'inline-block',
          }}
          >{this.props.list.map((channel, key) => {
            return (
              <li
                key={key}
                style={channel.name == this.props.current.name ? {
                  backgroundColor: 'aliceblue',
                  padding: '5px 2px'
                } : {
                  padding: '5px 2px'
                }}
                >
                <a
                  onClick={(event) => {
                    event.preventDefault();
                    this.props.onClick(channel.name);
                  }}
                  style={{
                    display: 'block'
                  }}
                  >{channel.name}</a>
              </li>
            );
        })}</ul>
      </div>
    );
  }
}

export default Rooms;