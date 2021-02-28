import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'

import './mini-dark.css';

import './App.css';
import Logo from './Logo'
import Navigation from './Navigation'
import Message from './Message';
import LogList from './LogList';
import LogEditText from './LogEditText';
import LogEditAudio from './LogEditAudio';



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
            <Router>

      <Navigation />

      <Message
      messageContent={this.state.messageContent}
      type={this.state.messageType} 

      />

<Route path="/get/:id"  exact component={LogEditText} />

      <Route path="/" exact 
      render={(props) => (
        <LogList {...props} onMessageChange={this.handleMessageChange} />
      )}/>
      <Route path="/text"  component={LogEditText} />
      <Route path="/audio"  component={LogEditAudio} />


      </Router>

    </div>
  );


}

}


export default App;
