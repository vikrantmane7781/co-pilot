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
import SendIcon from 'mdi-material-ui/Send';
import Box from '@mui/material/Box';

// Dummy JSON data
const dummyData = [
  { name: "Internet Banking Application",  tech: ['Java','python','typescript'], createdOn: 30, createdBy: 'New York' },
  { name: "Road Detection System", tech: ['Java','python','typescript'], createdOn: 25, createdBy: 'Los Angeles' },
  { name: "Event Management",  tech: ['Java','python','typescript'] , createdOn: 40, createdBy: 'Chicago' },
  // Add more dummy data as needed
];

const columns = [
  { id: 'radio', label: '', minWidth: 2 },
  { id: 'name', label: 'Project Name & Description', minWidth: '150' },
  { id: 'tech', label: 'Technologies', minWidth: '150' },
  { id: 'description', label: 'Created Date', minWidth: '70', align: 'left' },
  { id: 'crdate', label: 'Created By', minWidth: '70', align: 'left' },
];

const BlueTableCell = styled(TableCell)({
  color: '#0070D2',
  fontSize: '14px !important',
  ontWeight: 'bold'
});

const TechBox = styled(Box)({
  display: 'inline-block',
  padding: '4px 8px', // Adjust padding as needed
  marginRight: '8px', // Adjust margin as needed
  border: '1px solid #ccc', // Add border
  borderRadius: '4px', // Add border radius
});

const CollapsibleRow = ({ row, selectedRow, handleRadioChange }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(false);
    //setOpen(!open);
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
        <TableCell style={{ color: '#0070D2', fontSize: '14px' }}>{row.name}</TableCell>
        <TableCell>  <TechBox>
                    {row.tech.join(' | ')}
                  </TechBox></TableCell>
        <TableCell>{row.createdOn}</TableCell>
        <TableCell>{row.createdBy}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography>{row.name}</Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
const ChatMessage = ({ message, isUser }) => (
  <div style={{ textAlign: isUser ? 'right' : 'left', margin: '10px 0' }}>
    <Typography variant="body1" style={{ backgroundColor: isUser ? '#0070D2' : '#F5F5F5', color: isUser ? 'white' : 'black', padding: '10px', borderRadius: '10px', display: 'inline-block' }}>
      {message}
    </Typography>
  </div>
);
const TableStickyHeader = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

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


  const handleSendMessage = () => {
    if (userMessage.trim() !== '') {
      setChatMessages([...chatMessages, { message: userMessage, isUser: true }]);
      setUserMessage('');
      // You can add logic here to handle AI response and update chatMessages accordingly
    }
  };
  const filteredData = dummyData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.tech.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.createdOn.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.createdBy.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelectProject = () => {
    // Retrieve the selected row data
    const selectedRowData = dummyData.find((row) => row.name === selectedRow);
    console.log(" ----- ",selectedRowData);
    // Store the selected row data in session storage
    sessionStorage.setItem('selectedRowData', JSON.stringify(selectedRowData));
  };
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
            sx={{ width: '90%' }} // Adjust the width of the search bar
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
            style={{ backgroundColor: '#0070D2', color: 'white',marginRight:'%' }}
            onClick={handleSelectProject} 
          >
            Select Project
          </Button>
      </Grid>
      </CardActions>
     
    </Paper>
  );
};

export default TableStickyHeader;
