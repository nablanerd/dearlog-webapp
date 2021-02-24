import React, { Component } from 'react';

class LogEmpty extends React.Component {
    
    render() {
      return (
        <div className="row">
        <div className="col-sm-12">
          <div className="card fluid center">NO LOGS<button onClick={this.props.handleReload}>RELOAD?</button>
        </div>
        </div></div>
      
      )
      
      
      
    }
  }


  export default LogEmpty;