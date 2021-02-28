import axios from 'axios';

class LogStore 
{

    updateLog (id, data) {
    
        axios.put(`http://localhost:7827/api/logs/${id}`, data)
        .then(res => {

            console.log(res.data)
        })


      }
       getLog = async (id) =>
{

    const response = await axios.get(`http://localhost:7827/api/logs/${id}`)
    return response.data

}

}//

export default LogStore;