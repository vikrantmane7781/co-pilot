import React, { useState } from 'react';
import TextField from '@mui/material/TextField'

import SendIcon from 'mdi-material-ui/SendCircle';
import Box from '@mui/material/Box';

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [textFieldRows, setTextFieldRows] = useState(1); // State to store the number of rows for TextField
  const textFieldRef = useRef(null); // Ref to TextField element

  // Function to calculate the number of rows needed based on the text content
  const calculateRows = () => {
    if (textFieldRef.current) {
      const lineHeight = parseFloat(window.getComputedStyle(textFieldRef.current).lineHeight);
      const currentRows = Math.ceil(textFieldRef.current.scrollHeight / lineHeight);
      setTextFieldRows(currentRows);
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== '') {
      onSubmit(message);
      setMessage('');
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
      type="text"
      placeholder="Type your message..."
      value={message}
      onChange={handleChange}
      fullWidth
      variant="outlined"
      rows={textFieldRows}
      inputRef={textFieldRef}
      InputProps={{
        endAdornment: (
          <SendIcon onClick={handleSubmit} sx={{ fontSize: '6vh' }} style={{ cursor: 'pointer'}}/>
        ),
      }}
    />
      </Box>
    );
  };
  
  export default ChatInput;