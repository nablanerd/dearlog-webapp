import React, { useEffect, useState } from "react";
import { useSearch } from "./useSearch";

function Search({entities,  fooCb, filterByField}) {

    const [name, setName] = useState('');
    const [foundentities, setFoundentities] = useState([]);

     useEffect( () => {

      console.log("name", name);

      console.log("entities", entities);

      if(name === ""){
        fooCb(entities)
        //setFoundentities([])
      }
      else
      {
        fooCb(foundentities)
      }

      console.log("foundentities", foundentities);

    }, [name]); 

    const filter = (e) => {
      const keyword = e.target.value;

      if (keyword !== '') {
        const results = entities.filter((entity) => {
          return entity[filterByField].toLowerCase().startsWith(keyword.toLowerCase());
          // Use the toLowerCase() method to make it case-insensitive
        });
        setFoundentities(results);
        //fooCb(results)


      } else {
         setFoundentities(entities);
        //fooCb(entities)


        // If the text field is empty, show all users
      }
  


    setName(keyword);
    };



    return (
<>
<input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder={"Filter by "+filterByField.toUpperCase()}
      />

      <button onClick={() => setName("")}>Reset</button>
      
</>

    )
  }


  export default Search;
