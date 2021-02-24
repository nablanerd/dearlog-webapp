import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navigation extends React.Component {
    
    render() {
      return (
      <header>
        <Link to="/" className="logo">DEARLOG</Link>

  <Link to="/Text" className="button">Text</Link>

  <Link to="/Audio" className="button">Audio</Link>

</header>
      )
      
      
      
    }
  }


  export default Navigation;