import { useState , useEffect} from "react";

import Table from "./Table";

import Search from './Search';

const HyperTable =   ({columns, entities, caption, actions, title, ADD_BUTTONS, filterByField}) => {

    const [foundEntities, setFoundEntities] = useState([]);


    return (
        <>
        <h1>{title}</h1>

        {ADD_BUTTONS.map(({text, link, id})=> {
        return <a key={id} className="button" href={link}>{text}</a>
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