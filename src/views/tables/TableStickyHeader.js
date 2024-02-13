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
import TableSortLabel from '@mui/material/TableSortLabel';

// Dummy JSON data
const dummyData = [
  { id: 1, name: 'Item 1', tech: 'Tech 1', description: 'Description 1', crdate: 'Date 1' },
  { id: 2, name: 'Item 2', tech: 'Tech 2', description: 'Description 2', crdate: 'Date 2' },
  { id: 3, name: 'Item 3', tech: 'Tech 3', description: 'Description 3', crdate: 'Date 3' },
  // Add more dummy data as needed
];

const columns = [
  { id: 'radio', label: '', minWidth: 5 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'tech', label: 'Technologies', minWidth: 30 },
  { id: 'description', label: 'Description', minWidth: 170, align: 'left' },
  { id: 'crdate', label: 'Created Date', minWidth: 170, align: 'left' },
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
            checked={selectedRow === row.name}
            onChange={() => handleRadioChange(row.name)}
          />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.tech}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.crdate}</TableCell>
      </TableRow>
      <TableRow>
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
  const [selectedRow, setSelectedRow] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRadioChange = (name) => {
    setSelectedRow(name);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                    sx={{
                      '&:hover': {
                        color: 'primary.main', // Change color on hover
                      },
                      // Add more custom styles here as needed
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData
              .sort((a, b) => {
                const isAsc = order === 'asc';
                return isAsc ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <CollapsibleRow
                  key={row.id}
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
        count={dummyData.length}
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
