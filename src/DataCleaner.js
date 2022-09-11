class DataCleaner
{

 format (data) {    
    const {id, title, description, createdAt, heart, updatedAt, namespace, tag, type, content} = data;

var intl=new Intl.DateTimeFormat("fr",  
{
  hour12: false, 
  hour: "2-digit", 
  minute: "2-digit", 
  second:"2-digit", 
  day:"2-digit", 
  month:"2-digit", 
  year:"numeric"
});


    const newData = {
        id : id,
        title : title || "",
        description: description || "",
        createdAt: intl.format(new Date(createdAt)),
        heart:heart,
        updatedAt:intl.format(new Date(updatedAt)),
        namespace:namespace || "",
        tag:tag || "",
        type:type,
        content:content || ""
    };

return newData



}

}//

export default DataCleaner;