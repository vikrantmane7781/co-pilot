// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { styled } from '@mui/material/styles'

import CardContent from '@mui/material/CardContent'

import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'


import ChatInput from './ChatInput';
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  const [queries, setQueries] = useState([]);

  const handleSubmitQuery = (query) => {
    // Here you can handle submitting the query, for now, we will just log it
    console.log('Submitted Query:', query);
    // Add the query to the queries state
    setQueries([...queries, query]);
  };

  return (
    <CardContent  sx={{ height: '80vh' }}>
      
    </CardContent>
  );
};

export default TabAccount;

