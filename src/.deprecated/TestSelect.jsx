import React , {useEffect, useState } from 'react';
//import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

import axios from 'axios';

function TestSelect(props) {

  /*
    const optionsData = [
        { id:1, value: 'chocolate', label: 'Chocolate' },
        { id:2, value: 'strawberry', label: 'Strawberry' },
        { id:3, value: 'vanilla', label: 'Vanilla' }
      ]

*/
      const [options, setOptions] = useState([ ])
      const [namespace, setNamespace] = useState([])


      const [currentNamespace, setCurrentNamespace] = useState( { id:1, value: 'n3', label: 'n3' })

      async function  get_namespace ()
{

  const response = await axios.get(`http://localhost:7827/namespaces`)

 // console.log(optionsData);
  
  const _data =

  response.data.map(e => {

   return {...e, ...{ value:e.name, label:e.name} }


  })

  console.log(_data)

 // return response.data

return _data
 //return optionsData

}
      useEffect(async ()=> {

        const namespaces = await get_namespace()

      setOptions(namespaces)
       
      },[])


      function handleSelect(selected)
      {
       // const {id, name} = selected

       console.log(selected)

       if(selected !== null)
       setNamespace((({ id, name }) => ({ id, name }))(selected))

      //  console.log(namespace);

      }

      function handleInputChange(v, actionMeta)
      {
       // console.log(v);

       // console.log(`action: ${actionMeta.action}`);

      }

      function handleCreate(inputValue)
      {

        console.log(inputValue);

        setOptions(options => options.concat({id:999,  value:inputValue, label:inputValue}))

      }
    return (
      //isMulti
      //defaultValue={}

        <div>
                {console.log(namespace)}

                      {JSON.stringify(namespace)}
<hr/>
            {JSON.stringify(options)}

            

              <CreatableSelect
               onChange={handleSelect} 
               onInputChange={handleInputChange}
               onCreateOption={handleCreate}
               options={options}  
                
               />
        </div>
    );
}

export default TestSelect;