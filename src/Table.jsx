import _ from "lodash";
import React from 'react';
import "./Table.css";

const Table = ({row = 5, column = 5, robots}) => <table className="table">
    <tbody>
    {
        new Array(row).fill().map((r, i) => <tr key={i}>
            {
                new Array(column).fill().map((c, j) => <td key={j} row={i} column={j}>
                    {_.get(robots, `[${i}][${j}]`)}</td>)
            }
        </tr>)
    }
    </tbody>
</table>;

export default Table;