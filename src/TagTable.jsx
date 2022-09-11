import { useState , useEffect} from "react";

import HyperTable from './HyperTable';

import LogStore from './LogStore';

import { Link } from "react-router-dom";

const TagTable =   (props) => {

    const store = new LogStore()
    const caption = "/tags"
    const  title = "TAGS"



 
    const columns = [
        { label: "ID", accessor: "id", sortable: true },
        { label: "Name", accessor: "name", sortable: true ,sortbyOrder : "desc", func : (tag) => <Link to={`/tag/${tag.id}`} >{tag.name}</Link>},
        { label: "Description", accessor: "Description", sortable: true },
        { label: "Action", accessor: "action", sortable: false   },
    
      ]

      const actions = [

        {id:736768173678168, type:"nolinked", text : "Delete", callback : (id) => deleteEntity(id)},
        { id:9390019109, type:"linked" }
  
  
      ]
  
      const ADD_BUTTONS = [
        {id:54574756767673,  text:"Add Tag", link:"/newtag"}
    ]

      
      const [tags, setTags] = useState([]);




                const post_process_data = (data) => {

                    return data
                      } 


                      const deleteEntity = (id) => {


                        console.log("deleting", id)
                        store.deleteTag(id, () => {
            
                            const newTags = tags.filter(e => e.id != id)
                            setTags(newTags)
                        
                           })  /**/
            
                      }

                      useEffect(async () => { 
                   
                        const tagsData = await store.getTags()
                        setTags(post_process_data(tagsData))
                    
                                   return function cleanup() {      
                                    console.log("cleanup");  

                                    setTags([])
                                };  }, []);
            
            
                                console.log("tags", tags)


                                return (


                                    <HyperTable
                                    {...props} 
                                    caption={caption}
                                    entities={tags}
                                    columns={columns}
                                    actions={actions}
                                    title={title}
                                    ADD_BUTTONS={ADD_BUTTONS}
                                    filterByField={"name"}

                                    
                                  />
                
                                )

}

export default TagTable;