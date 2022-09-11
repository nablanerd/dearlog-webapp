import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import LogStore from './LogStore';

function NamespaceList(props) {

    const [namespaces, setNamespaces] = useState([])
    const store = new LogStore()

    useEffect(async () => {

        const namespacesData = await store.getNamespaces()
        setNamespaces(namespacesData)


    },[])


   async function deleteNamespace(id)
    {
    store.deleteNamespace(id, () => {

      const newNamespaces = namespaces.filter(e => e.id != id)
      setNamespaces(newNamespaces)

     })
     
    }
    return (
       <>
               <h1>NAMESPACES</h1>
<a className="button" href="/newnamespace">Add Namespace</a>
        <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
      
        { namespaces.map(namespace => 
        
        <tr key={namespace.id}>
        <td data-label="ID">{namespace.id}</td>
        <td data-label="Name"><Link to={`/namespace/${namespace.id}`} >{namespace.name}</Link></td>
        <td data-label="Description">{namespace.description}</td>
        <td data-label="Action">
          <button onClick={() => deleteNamespace(namespace.id)}>Delete</button>

          {namespace.logs.length === 0 ?
          ""
          :
<Link className="button" to={{
pathname : "/logs",
state: { logs: namespace.logs }  
}}>Logs</Link>
          }


          </td>
      
      </tr>
        
        
        )}
      
      
        </tbody>
      
      </table>
</>
    );
}

export default NamespaceList;