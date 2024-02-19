import React, { useState } from 'react';
import TextField from '@mui/material/TextField'
import IconButton from 'mdi-material-ui/SimpleIcons';
import SendIcon from 'mdi-material-ui/Send';
import Box from '@mui/material/Box';

const ChatInput = ({ onSubmit }) => {
    const [query, setQuery] = useState('');
  
    const handleChange = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (query.trim() !== '') {
        onSubmit(query);
        setQuery('');
      }
    };
  
    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'sticky',
          bottom: '0',
          backgroundColor: 'white',
          padding: '8px',
          borderTop: '1px solid #ccc',
          zIndex: '1',
        }}
      >
        <TextField
          value={query}
          onChange={handleChange}
          placeholder="Type your query..."
          fullWidth
          variant="outlined"
          size="small"
        />
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    );
  };
  
  export default ChatInput;