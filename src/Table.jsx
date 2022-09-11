import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "./useSortableTable";

import './Table.css';

import { useState , useEffect} from "react";

const Table =   (props) => {

  const { caption, data, columns, actions } = props
  const [tableData, handleSorting] =  useSortableTable(data, columns);

    return (
      <>
      

        <table className="table">
          <caption>{caption}</caption>
          <TableHead {...{ columns, handleSorting }} />
          <TableBody {...{ columns, tableData, actions }} />
        </table>
      </>
    );


};

export default Table;