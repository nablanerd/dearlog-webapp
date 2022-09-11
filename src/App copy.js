import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './mini-dark.css';

import './App.css';
import Logo from './Logo'
import Navigation from './Navigation'
import Message from './Message';

import LogList from './LogList';
import Table from "./Table";
import tableData1 from "./tableData1.json";

import Log from './Log';

import NamespaceList from './NamespaceList';
import Namespace from './Namespace'

import TagsList from './TagsList';
import Tag from './Tag';

import LogStore from './LogStore';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.store = new LogStore();
  
    this.state = {
      logs: []
    }

    

  }

  componentDidMount() {

    this.loadLogs()

  }


  async loadLogs()
  {

    try {

      const logs = await this.store.getLogs()

      this.setState( {logs :  logs })

    //  this.props.notify_success("Logs loaded !!!")


    }
    catch (error)
    {

      console.log(error);
        
      //this.props.notify_error(error.message)

    }

  }
  
  render(){
    
  const debug = false

  const { logs } = this.state;

  console.log(logs);

  const columns = [
    { label: "ID", accessor: "id", sortable: true },
    { label: "Title", accessor: "title", sortable: true },
    { label: "Description", accessor: "description", sortable: true },
    { label: "Created", accessor: "created", sortable: true },
  
    
  ];

  return (
    <div className="container">

<ToastContainer />

            <Router>
            
            <Navigation />


<Route path="/" exact 
render={(props) => (
  <Table
  {...props} 
  caption=""
  data={logs}
  columns={columns}
/>
)}/>

<Route async path="/logs" exact 
render={(props) => (
  <Table
  {...props} 
  caption="Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
  data={logs}
  columns={columns}
/>

)}/>

<Route path="/log/:id" exact 
      render={(props) => (
        <Log {...props} notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/namespace"  exact
      render={(props) => (
        <NamespaceList {...props}  notify_error={toast.error} notify_success={toast.success} />
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
        <TagsList {...props}  notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/tag/:id" exact
      render={(props) => (
        <Tag {...props}  notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/newtag" exact
      render={(props) => (
        <Tag {...props}  notify_error={toast.error} notify_success={toast.success} />
      )}/>

<Route path="/text" exact 
      render={(props) => (
        <Log {...props} type ="text" notify_error={toast.error} notify_success={toast.success} />
      )}/>


<Route path="/audio"  
      render={(props) => (
        <Log {...props} type ="audio" notify_error={toast.error} notify_success={toast.success} />
      )}/>

      </Router>


    </div>
  )


}

}

export default App;
