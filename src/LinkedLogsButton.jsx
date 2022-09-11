import { useState , useEffect} from "react";

import { Link } from "react-router-dom";

const LinkedLogsButton =   ({entity}) => {


    console.log("NO LinkedLogsButton", entity);
    
    function computeLink(entity)
    {   /* 
        const identity = "namespace"
        const logsStuff =  entity.logs.map(obj => 
          {
            const objMore = {}
            objMore[identity] = entity.name

            return { ...obj, ...objMore}
          }
                  
          ) */




console.log("NO computeLink logs=", entity.logs);

        return <Link className="button" to={{
          pathname : "/linkedlogs",
          state: { logs: entity.logs }  
          }}>{"Logs"}</Link>

    }


return (
<>
    { entity.logs && entity.logs.length > 0 ? computeLink(entity):"" }
    </>
)
}


export default LinkedLogsButton;