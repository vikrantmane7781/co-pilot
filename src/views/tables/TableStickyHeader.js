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
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from 'mdi-material-ui/Magnify';

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
  { id: 'description', label: 'Created Date', minWidth: 170, align: 'left' },
  { id: 'crdate', label: 'Created By', minWidth: 170, align: 'left' },
];

const BlueTableCell = styled(TableCell)({
  color: '#0070D2',
});

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
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = dummyData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.crdate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CustomTableSortLabel = styled(TableSortLabel)({
    // Ensure the sort icon is always visible
    '& .MuiTableSortLabel-icon': {
      opacity: 1,
    },
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Grid container alignItems="center" justifyContent="flex-end" padding={3}> {/* Align the items to the right */}
        <Grid item xs={4}>
          <TextField
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small" // Reduce the size of the search bar
            sx={{ width: '70%' }} // Adjust the width of the search bar
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <BlueTableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {index === 0 ? (
                    // Render empty cell for the first column
                    <div />
                  ) : (
                    <CustomTableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </CustomTableSortLabel>
                  )}
                </BlueTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
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
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Divider sx={{ margin: 0 }} />
      <CardActions >
      <Grid container justifyContent="flex-end">
          <Button
            size="medium"
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#0070D2', color: 'white',marginRight:'12%' }}
          >
            Select Project
          </Button>
      </Grid>
      </CardActions>
    </Paper>
  );
};

export default TableStickyHeader;
