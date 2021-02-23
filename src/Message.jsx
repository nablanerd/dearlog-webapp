import React, { Component } from 'react';

class Message extends React.Component {
    
    render() {
      let classCard ="card fluid "+this.props.type

      return (

        <div className="row">
                <div className="col-sm-12"><div className={classCard}>???</div></div>
  
</div>


      )
      
      
      
    }
  }


  export default Message;