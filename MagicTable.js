const o = [
    { "key1": "a1", "key2": "a2"},
    { "key1": "b1", "key2": "b2"}
]

o.map ((e,i) =>{

   /*  prop = Object.keys(e)[i];    
    value = e[prop] 
 */

const props =    Object.keys(e)

console.log(props);

// for (prop of props)
// {
    props.map(prop =>{

        value = e[prop] 
        console.log(value);

    })
  


// }


})