import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import LogStore from './LogStore';

function TagsList(props) {

    const [tags, setTags] = useState([])
    const store = new LogStore()

    useEffect(async () => {

        const tagsData = await store.getTags()
        setTags(tagsData)


    },[])


    return (
      <>
      <h1>TAGS</h1>
<a className="button" href="/newtag">Add Tag</a>
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
      
        { tags.map(tag => 
        
        <tr key={tag.id}>
        <td data-label="ID">{tag.id}</td>
        <td data-label="Name"><Link to={`/tag/${tag.id}`} >{tag.name}</Link></td>
        <td data-label="Description">{tag.description}</td>
        <td data-label="Action"><a href="#">Delete</a>

{tag.logs.length === 0 ? 
""
:
<Link className="button" to={{
  pathname : "/logs",
  state: { logs: tag.logs }  
  }}>{"Logs"}</Link>
}


        </td>
      
      </tr>
        
        
        )}
      
      
        </tbody>
      
      </table>

      </>
    );

}

export default TagsList;