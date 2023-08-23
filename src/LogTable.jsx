import { useState , useEffect} from "react";

import HyperTable from './HyperTable';

import LogStore from './LogStore';

import Heart from './Heart';
import { Link } from "react-router-dom";
import Format from './Format'

const LogTable =   (props) => {

    const store = new LogStore()
    const format = new Format()

    const caption = "/"
   const  title = "LOGS"


   const columns = [
      { label: "ID", accessor: "id", sortable: true },
      { label: "Title", accessor: "title", sortable: true ,sortbyOrder : "desc", func : (log) => <Link to={`/log/${log.id}`} >{log.title}</Link>},
      { label: "Description", accessor: "Description", sortable: true },
      { label: "CreatedAt", accessor: "createdAt", sortable: true, func : (log) =>format.date(log.createdAt) },
      { label: "Heart", accessor: "heart", sortable: true, func : (log) =>log.heart? <Heart />: ""},
      //{ label: "Namespace", accessor: "namespace", sortable: true   },
      { label: "Namespace", accessor: "namespace", sortable: true , func : (log) => <Link to={`/namespace/${log.id}`} >{log.namespace}</Link>},

      { label: "Action", accessor: "action", sortable: false   },
  
  
    ]

    const actions = [

      {id:17288712872187,  type:"nolinked", text : "Delete", callback : (id) => deleteEntity(id)}

    ]

    const ADD_BUTTONS = [
      {id:74373873,text:"Add Text Log", link:"/newtextlog"},
  ]

    const [logs, setLogs] = useState([]);

    
    const post_process_data =  (data, func=null) => {

        return data.map( (log) =>{ 

         console.log("NO log.namespace",log);
         
          
         const namespaceComputed =


         log.namespace?.name? log.namespace.name : log.namespace? log.namespace: ""


         return {
            ...log,
           /*  namespace:  log?.namespace?.name */
            namespace:  namespaceComputed

          }
        
        })
          } 


          const deleteEntity = (id) => {


            console.log("deleting", id)
            store.deleteLog(id, () => {

                const newLogs = logs.filter(e => e.id != id)
                setLogs(newLogs)
            
               })  /**/

          }

    useEffect(async () => { 
                   
        const logsData = await store.getLogs()

        const logsStuff = props?.location?.state?.logs ? props.location.state.logs : logsData

        console.log("props?.location?.state?.logs ?", props?.location?.state?.logs );


        const processed_data = post_process_data(logsStuff)

        console.log("processed_data", processed_data)

        setLogs(processed_data)
    
                   return function cleanup() {      
                    console.log("cleanup");  
                };  }, []);

                return (

                    <HyperTable
                    {...props} 
                    caption={caption}
                    entities={logs}
                    columns={columns}
                    actions={actions}
                    title={title}
                    ADD_BUTTONS={ADD_BUTTONS}
                    filterByField={"title"}
                    
                  />

                )

}


export default LogTable;