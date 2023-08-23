import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './mini-dark.css';

import './App.css';
import Navigation from './Navigation'



import Log from './Log';

import NamespacesTable from './NamespacesTable'

import Namespace from './Namespace'

import TagTable from './TagTable'

import Tag from './Tag';


import LogTable from './LogTable';

const App = () => {

  
  return (
    <div className="container">

<ToastContainer />


<Router>
            
            
            <Navigation />

      

            <Route path="/" exact 
render={(props) => (
 
  <LogTable
  {...props} 
/>


)}/>

<Route path="/dearlog-webapp" exact 
render={(props) => (
 
  <LogTable
  {...props} 
/>


)}/>

<Route async path="/linkedlogs" exact 
render={(props) => (
 
  <LogTable
  {...props} 
/>


)}/>




<Route path="/log/:id" exact 
      render={(props) => (
        <Log {...props} notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/namespace"  exact
      render={(props) => (
        <NamespacesTable {...props}  notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/namespace/:id" exact 
      render={(props) => (
        <Namespace {...props} notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/newnamespace" exact 
      render={(props) => (
        <Namespace {...props} notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/tag" exact
      render={(props) => (

<TagTable   {...props} />
)}/>

<Route path="/tag/:id" exact
      render={(props) => (
        <Tag {...props}  notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/newtag" exact
      render={(props) => (
        <Tag {...props}  notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/newtextlog" exact 
      render={(props) => (
        <Log {...props} type ="text" notify_error={toast.error} notify_success={toast.success} />
      )}/>

      </Router>


 
    </div>
  );


};

export default App;

