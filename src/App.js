import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import './App.css';

var generateName = require('sillyname');
var sillyName = generateName();

var randomColor = require('random-color');
var randomcolor = randomColor();

class App extends Component {
  state = {
    messages: [],
    member: {
      username: sillyName,
      color: randomcolor.hexString(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("Wrm4lU0EYWZ2si6M", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Scaledrone Chat Application</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;
