import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

const columns = [
  { id: 'radio', label: '', minWidth: 10 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'tech', label: 'Technologies', minWidth: 30 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'crdate',
    label: 'Created Date',
    minWidth: 170,
    align: 'left',
  },
];

function createData(name, tech, description, crdate) {
  return { name, tech, description, crdate };
}

const rows = [
  createData('India', 'IN', 'Description 1', 1324171354),
  createData('Italy', 'IT', 'Description 2', 60483973),
  createData('China', 'CN', 'Description 3', 1403500365),
  createData('United States', 'US', 'Description 4', 327167434),
  createData('Canada', 'CA', 'Description 5', 37602103),
  createData('Australia', 'AU', 'Description 6', 25475400),
  createData('Germany', 'DE', 'Description 7', 83019200),
  createData('Ireland', 'IE', 'Description 8', 4857000),
  createData('Mexico', 'MX', 'Description 9', 126577691),
  createData('Japan', 'JP', 'Description 10', 126317000),
];

const CollapsibleRow = ({ row, selectedRow, handleRadioChange }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow hover onClick={handleToggle}>
        <TableCell>
          <Radio
            checked={selectedRow === row.name} // Check if the row's name matches the selectedRow state
            onChange={() => handleRadioChange(row.name)} // Pass the row's name to handleRadioChange
          />
        </TableCell>
        
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.tech}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.crdate}</TableCell>
      </TableRow>
      <TableRow>

        {/** here droper menus details */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography>{row.description}</Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const TableStickyHeader = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null); // State to store the selected row

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRadioChange = (name) => {
    setSelectedRow(name); // Set the selected row when a radio button is clicked
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <CollapsibleRow
                key={idx}
                row={row}
                selectedRow={selectedRow}
                handleRadioChange={handleRadioChange}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Divider sx={{ margin: 0 }} />
      <CardActions>
        <Button size="medium" type="submit" sx={{ mr: 2 }} variant="contained">
          Select Project
        </Button>
      </CardActions>
    </Paper>
  );
};

export default TableStickyHeader;
