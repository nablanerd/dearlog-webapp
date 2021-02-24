import React, { Component } from 'react';

import './mini-dark.css';

import './App.css';
import Logo from './Logo'
import Navigation from './Navigation'
import Message from './Message';
import LogList from './LogList';



class App extends React.Component {

  constructor(props) {
    super(props);


    this.state = {messageContent: 'xxxx',messageType:'success'};

    this.handleMessageChange = this.handleMessageChange.bind(this);
  }


  handleMessageChange(messageContent,messageType) {
  this.setState({messageContent, messageType});  
  
  }

render(){

  return (
    <div className="container">
      
      <Navigation />
      <Message
      messageContent={this.state.messageContent}
      type={this.state.messageType} 

      />
      <LogList onMessageChange={this.handleMessageChange}/>
    </div>
  );


}

}


export default App;
