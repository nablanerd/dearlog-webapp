import React, { Component } from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);

  }


    render() {
      let classCard ="card fluid center "+this.props.type

      return (

        <div className="row">
                <div className="col-sm-12"><div className={classCard}>{this.props.messageContent}</div></div>
  
</div>


      )
      
      
      
    }
  }


  export default Message;