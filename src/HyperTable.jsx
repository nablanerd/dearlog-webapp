import { useState , useEffect} from "react";

import { Link } from "react-router-dom";

import Table from "./Table";

import Search from './Search';

const HyperTable =   ({columns, entities, caption, actions, title, ADD_BUTTONS, filterByField}) => {

    const [foundEntities, setFoundEntities] = useState([]);

const path = ""
    return (
        <>
        <h1>{title}</h1>

        {ADD_BUTTONS.map(({text, link, id})=> {
        //return <a key={id} className="button" href={link}>{text}</a>
        //return <ReactLink key={id} to= {link} >{text}</ReactLink>
       return  <Link key={id} to={link} className="button">{text}</Link>

        })}

        <br></br>

        <Search filterByField={filterByField} entities={entities} fooCb={foundEntities => setFoundEntities(foundEntities)} />

        <Table
        caption={caption}
        data={ foundEntities && foundEntities.length > 0 ? foundEntities : entities}
        columns={columns}
        actions={actions}
      />

</>

    )

}

export default HyperTable;