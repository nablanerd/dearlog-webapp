import React, { Component } from 'react';
import { Heart } from 'react-feather';
import axios from 'axios';

class LogList extends React.Component {
  state = {
    logs: []
  }

  constructor(props) {
    super(props);

  }

  getData(){

    axios.get(`http://localhost:7827/api/logs`)
      .then(res => {
        const logs = res.data;
        this.setState({ logs });

        this.props.onMessageChange(
          "Success!!! DATA RELOADED",
          "success"
        )

      })
      .catch( (error) => {
        console.log(error);
        
          this.props.onMessageChange(
            error.toString(),
            "error"           
          )

     })


  }
  componentDidMount() {

this.getData()
  }


  reload()
  {

this.getData()


  }
    render() {

     const isLogsEmpty =  this.state.logs.length === 0;

      return (

 isLogsEmpty? <div className="row">
<div className="col-sm-12">
  <div className="card fluid center">NO LOGS   <button onClick={() => this.reload()}>RELOAD?</button>
</div>
</div></div>
:
<table>
  <caption>LOGS</caption>
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Content</th>
      <th>Created</th>
      <th><Heart /></th>
      <th>Namespace</th>
      <th>Tags</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>

  { this.state.logs.map(log => 
  
  <tr key={log.id}>
  <td data-label="ID">{log.id}</td>
  <td data-label="Title">{log.title}</td>
  <td data-label="Content">{log.content}</td>
  <td data-label="Created">{log.createdAt}</td>
  <td data-label="Heart">{log.heart? <Heart />: ""}</td>
  <td data-label="Namespace">{log.namespace}</td>
  <td data-label="Tag">{log.tag}</td>
  <td data-label="Action"><a href="#">Delete</a></td>

</tr>
  
  
  )}


  </tbody>
</table>




      )
      
      
      
    }
  }


  export default LogList;