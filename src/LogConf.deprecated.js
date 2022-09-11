import Heart from './Heart';
import { Link } from "react-router-dom";
import Format from './Format'

const format = new Format()

/* 
DROP !!
*/
const LogConf =  {

title:"LOGS",
caption : "/",
action : [

    {
        name :"Add Log",
        link:"/newtextlog"

    }
],
table_action : [

    {
        name :"Delete",
        func: null
    }
],
columns : [
    { label: "ID", accessor: "id", sortable: true },
    { label: "Title", accessor: "title", sortable: true ,sortbyOrder : "desc", func : (log) => <Link to={`/log/${log.id}`} >{log.title}</Link>},
    { label: "Description", accessor: "Description", sortable: true },
    { label: "CreatedAt", accessor: "createdAt", sortable: true, func : (log) =>format.date(log.createdAt) },
    { label: "Heart", accessor: "heart", sortable: true, func : (log) =>log.heart? <Heart />: ""},
    { label: "Namespace", accessor: "namespace", sortable: true   },
    { label: "Type", accessor: "type", sortable: true   },
    { label: "Action", accessor: "action", sortable: false   },


  ]


}

export default LogConf;