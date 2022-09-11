import React, { useEffect, useState } from "react";

export const useSearch = (logs, fooCb, updateLogs) => {

/*   const [foundLogs, setFoundLogs] = useState([]);
  const [name, setName] = useState('');
 */

  const [bundle, setBundle] = useState({foundLogs:[], name:""})

   useEffect( () => {

    console.log("name", bundle.name);

    console.log("logs", logs);

    if(bundle.name === ""){
     // fooCb(logs)
      updateLogs(logs)
    }
    else
    {
     // fooCb(foundLogs)
      updateLogs(bundle.foundLogs)

    }

    console.log("bundle.foundLogs", bundle.foundLogs);

  }, [bundle.name]);

        const filter = (e) => {
            const keyword = e.target.value;
        
            if (keyword !== '') {
              const results = logs.filter((log) => {
                return log.title.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
              });
              setBundle({foundLogs:results});
            } else {
              setBundle({foundLogs:logs});
              // If the text field is empty, show all users
            }
        
            setBundle({name:keyword});
          };
  

    return [, filter];
 
}