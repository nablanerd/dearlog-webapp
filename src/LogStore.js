import axios from 'axios';

//const url = "http://localhost:8080"
//const url = "http://localhost:7827"
const url = "https://dearlog-api.herokuapp.com"

class LogStore 
{

getSocketAudioUrl = () =>
{

  return  `${url}/audio`

}


getAudioStreamingUrl = (id) =>
{

  return  `${url}/audio/${id}`

}

/*
LOG
*/

getNextPrevLog = async (id) =>
{

    const response = await axios.get(`${url}/api/logs/nextprev/${id}`)
    return response.data
}

getLog = async (id) =>
{

   const response = await axios.get(`${url}/api/logs/${id}`)
   return response.data
}

getLogs = async () =>
{

   const response = await axios.get(`${url}/api/logs`)
   return response.data
}

addLog(data, cb)
{

    axios.post(`${url}/api/logs`, data)
    .then(cb)
    .catch(e => console.log(e))

}

    
updateLog (id, data) {

axios.put(`${url}/api/logs/${id}`, data)
.then(res => {

    console.log(res.data)
})


}

deleteLog = async (id, cb) =>
{

    console.log(id);

    axios.delete(`${url}/api/logs/${id}`)
        .then(cb)
        .catch(e => console.log(e))
}


/*
NAMESPACE
*/

getNamespaces = async () => {

    const response = await axios.get(`${url}/api/namespaces`)


    return response.data

}

getNamespace = async (id) =>
{

   const response = await axios.get(`${url}/api/namespaces/${id}`)
   return response.data
}

addNamespace = (data, cb) => {

    axios.post(`${url}/api/namespaces`, data)
    .then(cb)
    .catch(e => console.log(e))


}

updateNamespace (id, data) {

    axios.put(`${url}/api/namespaces/${id}`, data)
    .then(res => {
    
        console.log(res.data)
    })
    
    
    }

deleteNamespace = async (id, cb) =>
{

    console.log(id);

    axios.delete(`${url}/api/namespaces/${id}`)
        .then(cb)
        .catch(e => console.log(e))


/**/
}



/*
TAG
*/
getTags = async () => {

    const response = await axios.get(`${url}/api/tags`)
    return response.data

}

getTag = async (id) =>
{

   const response = await axios.get(`${url}/api/tags/${id}`)
   return response.data
}


addTag = (data, cb) => {

    axios.post(`${url}/api/tags`, data)
    .then(cb)
    .catch(e => console.log(e))


}

updateTag(id, data) {

    axios.put(`${url}/api/tags/${id}`, data)
    .then(res => {
    
        console.log(res.data)
    })
    
    
    }

    deleteTag = (id, cb) =>
{

    console.log(id);

    axios.delete(`${url}/api/tags/${id}`)
        .then(cb)
        .catch(e => console.log(e))


/**/
}


}//

export default LogStore;