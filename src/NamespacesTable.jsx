import { useState , useEffect} from "react";

import HyperTable from './HyperTable';

import LogStore from './LogStore';

import { Link } from "react-router-dom";

const NamespacesTable =   (props) => {

    const store = new LogStore()
    const caption = "/namespaces"
    const  title = "NAMESPACES"



 
    const columns = [
        { label: "ID", accessor: "id", sortable: true },
        { label: "Name", accessor: "name", sortable: true ,sortbyOrder : "desc", func : (namespace) => <Link to={`/namespace/${namespace.id}`} >{namespace.name}</Link>},
        { label: "Description", accessor: "Description", sortable: true },

        { label: "Action", accessor: "action", sortable: false   },
    
      ]

      const actions = [

        {id:424542, type:"nolinked", text : "Delete", callback : (id) => deleteEntity(id)},
        { id:182727782, type:"linked" }
  
  
      ]
  
      const ADD_BUTTONS = [
        {id:77932970289,  text:"Add Namespace", link:"/newnamespace"}
    ]

      
      const [namespaces, setNamespaces] = useState([]);




                const post_process_data = (data) => {

                    return data
                      } 


                      const deleteEntity = (id) => {


                        console.log("deleting", id)
                        store.deleteNamespace(id, () => {
            
                            const newNamespaces = namespaces.filter(e => e.id != id)
                            setNamespaces(newNamespaces)
                        
                           })  /**/
            
                      }

                      useEffect(async () => { 
                   
                        const namespacesData = await store.getNamespaces()

                        console.log("namespacesData", namespacesData);
                        setNamespaces(post_process_data(namespacesData))
                    
                                   return function cleanup() {      
                                    console.log("cleanup");  
                                };  }, []);
            
            
                                console.log("namespaces", namespaces)


                                return (


                                    <HyperTable
                                    {...props} 
                                    caption={caption}
                                    entities={namespaces}
                                    columns={columns}
                                    actions={actions}
                                    title={title}
                                    ADD_BUTTONS={ADD_BUTTONS}
                                    filterByField={"name"}
                                    
                                  />
                
                                )

}

export default NamespacesTable;