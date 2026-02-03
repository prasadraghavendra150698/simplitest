import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@material-ui/core";
import tableData from "./tableData.json"; // Import JSON file

export default function App() {
  const [rows, setRows] = useState(tableData); // Use imported data
  const [orderBy, setOrderBy] = useState("id");
  const [orderDirection, setOrderDirection] = useState("asc");

  // Get the columns dynamically from the keys of the first row
  const columns = Object.keys(tableData[0]);

  // Sorting handler
  const handleSort = (column) => {
    const isAsc = orderBy === column && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(column);

    const sortedRows = [...rows].sort((a, b) => {

      if (column === "Price") {
      const priceA = parseFloat(a[column].replace(/[^0-9.-]+/g, "")); // Remove any non-numeric characters
      const priceB = parseFloat(b[column].replace(/[^0-9.-]+/g, ""));
      return isAsc ? priceA - priceB : priceB - priceA;
    }

      if (a[column] < b[column]) return isAsc ? 1 : -1;
      if (a[column] > b[column]) return isAsc ? -1 : 1;
      return 0;
    });

    setRows(sortedRows);
  };

  return (
    <TableContainer component={Paper} style={{ width: "60%", margin: "20px auto" }}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#f5f5f5" }}>
            {columns.map((column) => (
              <TableCell key={column}>
                <TableSortLabel
                  active={orderBy === column}
                  direction={orderBy === column ? orderDirection : "asc"}
                  onClick={() => handleSort(column)}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
