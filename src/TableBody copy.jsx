

import ActionButton from "./ActionButton";
import LinkedLogsButton from "./LinkedLogsButton"

import { Link } from "react-router-dom";

const TableBody = ({ tableData, columns, actions }) => {
  

  const generateTD = (data, func, accessor) => {

    const tData = data[accessor] ? data[accessor] : "——";

if(accessor == "action")
{


return <td key={accessor}>
  {

actions.map(({text, callback, type, id})=> 
{

return  type == "nolinked"?<ActionButton  key={id} text={text} callback={() => callback(data.id)} />:
  
  
  type == "linked"?<LinkedLogsButton key={id} entity={data}/>:""

}

)




  }



</td>


}

else
{
  if(func)
  {
    return <td key={accessor}>{func(data)}</td>
  }
  else
  {
    return <td key={accessor}>{tData}</td>
  }
}


  
  }

  console.log("tableData", tableData);
    return (
      
      <tbody>
        {tableData.map((data) => {
          return (
            <tr key={data.id}>
              {columns.map(({ accessor, func }) => {
                  
                return generateTD (data, func, accessor)
             

              })}
            </tr>
          );
        })}

      </tbody>
    );
  };
  
  export default TableBody;