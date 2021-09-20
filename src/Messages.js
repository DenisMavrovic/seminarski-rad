import React, { Component } from 'react';
import uniqueString from "unique-string"; 

class Messages extends Component {
  render() {
    const {messages} = this.props;    
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
        <div id="anchor"></div>
      </ul>
    );
  }

  renderMessage(message) {
    const {member, text} = message;
    const id = uniqueString(); 
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li key={id} className={className}> 
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      />
        <div className="Message-content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>      
    );    
  }
}

export default Messages;