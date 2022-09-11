import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navigation extends React.Component {
    
    render() {

    return (
      <header>
        
  <Link to="/" className="logo">DEARLOG</Link>

  <Link to="/namespace" className="button">Namespace</Link>

  <Link to="/tag" className="button">Tag</Link>

</header>
      )
      
      
      
    }
  }


  export default Navigation;

  /* 
    <Link to="/select" className="button">Select</Link>

    */