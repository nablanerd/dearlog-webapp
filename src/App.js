import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'

import { useState , useEffect} from "react";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './mini-dark.css';

import './App.css';
import Logo from './Logo'
import Navigation from './Navigation'
import Message from './Message';

//import LogList from './LogList';
/* import Table from "./Table";
import LogList from './LogList'; */

//import tableData1 from "./tableData1.json";

import Log from './Log';

//import NamespaceList from './NamespaceList';
import NamespacesTable from './NamespacesTable'

import Namespace from './Namespace'

//import TagsList from './TagsList';
import TagTable from './TagTable'

import Tag from './Tag';
/* 
import LogStore from './LogStore';

import Heart from './Heart';
import { Link } from "react-router-dom";
import Format from './Format'
 */

/* import Search from './Search';
 */

/* import HyperTable from './HyperTable';
 */
/* import LogConf from './LogConf' */

import LogTable from './LogTable';

const App = () => {

/*   const columns = [
    { label: "ID", accessor: "id", sortable: true },
    { label: "Title", accessor: "title", sortable: true, sortbyOrder : "desc" },
    { label: "CreatedAt", accessor: "createdAt", sortable: true },
    { label: "Heart", accessor: "heart", sortable: true, func : () =>{}, type:"bool" },
    { label: "Type", accessor: "type", sortable: true }  
    
  ];
 */

/*   const format = new Format()
 */
 
/* const columns = [
    { label: "ID", accessor: "id", sortable: true },
    { label: "Title", accessor: "title", sortable: true ,sortbyOrder : "desc", func : (log) => <Link to={`/log/${log.id}`} >{log.title}</Link>},
    { label: "Description", accessor: "Description", sortable: true },
    { label: "CreatedAt", accessor: "createdAt", sortable: true, func : (log) =>format.date(log.createdAt) },
    { label: "Heart", accessor: "heart", sortable: true, func : (log) =>log.heart? <Heart />: ""},
    { label: "Namespace", accessor: "namespace", sortable: true   },
    { label: "Type", accessor: "type", sortable: true   },

  ]; */
  
//, func : (log) =>log.namespace? log.namespace: ""

  //const [logs, setLogs] = useState([]);
 // const store = new LogStore()

  //const [store, setStore] = useState(() =>new LogStore());

  const [isLoaded, setIsLoaded] = useState(() => null);
 
/*   const [foundLogs, setFoundLogs] = useState([]);
 */
 /* const post_process_data = (data) => {

return data.map(log =>{ 
  return {
    ...log,
    namespace:  log.namespace? log.namespace?.name : ""

  }

})
  }  */


  

  const  LoadedStatus = (props) => {
    return isLoaded ? 'En ligne' : 'Hors-ligne';
  }

/*   const fooCbHandle  =  (foundLogs) => {

 // if(foundLogs && foundLogs.length > 0)
  //setLogs(foundLogs)
setFoundLogs(foundLogs)

  } */

//console.log("logs", logs);
  
  return (
    <div className="container">

<LoadedStatus />
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


<Route path="/newaudiolog" exact
      render={(props) => (
        <Log {...props} type ="audio" notify_error={toast.error} notify_success={toast.success} />
      )}/>

      </Router>


 
    </div>
  );


};

export default App;

