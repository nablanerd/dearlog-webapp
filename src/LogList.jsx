import React, { Component } from 'react';
import { Heart, Link as LinkIcon} from 'react-feather';
import axios from 'axios';
import LogEmpty from './LogEmpty';
import { Link } from "react-router-dom";

import Format from './Format'
import LogStore from './LogStore';

import Search from './Search';

class LogList extends React.Component {
  state = {
    logs: []
  }

  constructor(props) {
    super(props);

    this.format = new Format()

    this.store = new LogStore()


  }


  async loadLogs()
  {

    try {

      const logs = await this.store.getLogs()

      this.setState( {logs :  logs })

      this.props.notify_success("Logs loaded !!!")


    }
    catch (error)
    {

      console.log(error);
        
      this.props.notify_error(error.message)

    }


  }
   componentDidMount() {
    this.loadLogs()

  }


  reload()
  {

    this.loadLogs()


  }
   render() {

    console.log(this.state.logs);



    const isLogsEmpty =  this.state.logs.length === 0;
     const logs = this.props?.location?.state?.logs ? this.props.location.state.logs : this.state.logs
     
     return (

  isLogsEmpty? <LogEmpty handleReload={() => this.reload()}/>
: 
<>

<table>
  <caption>LOGS</caption>
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Description</th>
      <th>Created</th>
      <th><Heart /></th>
      <th>Namespace</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>

  {
  

  /*  this.state.logs.map(log =>  */
  logs.map(log =>
  
  <tr key={log.id}>
  <td data-label="ID">{log.id}</td>
  <td data-label="Title"><Link to={`/log/${log.id}`} >{log.title}</Link></td>
  <td data-label="Description">{log.description}</td>
  <td data-label="Created">{this.format.date(log.createdAt)}</td>
  <td data-label="Heart">{log.heart? <Heart />: ""}</td>
  <td data-label="Namespace">{JSON.stringify(log.namespace?.name)}</td>
  <td data-label="Type">{log.type}</td>

</tr>
  
  
  )}


  </tbody>

</table>



</>

      )
      
      
      

    }
  }


  export default LogList;