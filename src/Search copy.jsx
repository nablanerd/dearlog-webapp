import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";


function Search({logs}) {

    const [name, setName] = useState('');

    // the search result
  const [foundLogs, setFoundLogs] = useState([]);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = logs.filter((log) => {
        return log.title.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundLogs(results);
    } else {
        setFoundLogs([]);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };


    return (
<>
<input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter by Title"
      />

      <button onClick={() => setName("")}>Reset</button>


      <div className="user-list">
        {foundLogs && foundLogs.length > 0 ? (
          foundLogs.map((log) => (
            <li key={log.id} className="user">
              <span className="user-id">{log.id}</span>
              <span className="user-name"><Link to={`/log/${log.id}`} >{log.title}</Link></span>
            </li>
          ))
        ) : (
          <h3>No results found!</h3>
        )}
      </div>


      
</>

    )
  }


  export default Search;
