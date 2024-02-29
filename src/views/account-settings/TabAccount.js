// ** React Imports
import { useState ,useEffect,useRef} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { styled } from '@mui/material/styles'

import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
// ** Icons Imports
import Typography from '@mui/material/Typography';
import SendIcon from 'mdi-material-ui/SendCircle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




const TechBox = styled(Box)({
  display: 'inline-block',
  padding: '4px 8px', // Adjust padding as needed
  marginRight: '8px', // Adjust margin as needed
  border: '1px solid #ccc', // Add border
  borderRadius: '4px', // Add border radius
});

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== '') {
      onSubmit(message);
      setMessage('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior of Enter key
      handleSubmit(); // Call submit function when Enter key is pressed
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Center horizontally
        }}
      >
     <div style={{ 
      position: 'relative',
       flex: '1', 
       marginRight: '8px',
       border: '1px solid #ccc', // Add border
       borderRadius: '4px', // Add border radius
       maxWidth: 'calc(100% - 60px)', // Adjust the width here
         }}>
        <TextareaAutosize
          rows={1} // Set initial number of rows
          maxRows={6} // Maximum number of rows before scrolling
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
          style={{
            width: '96%', // Full width of parent container
            resize: 'none',
            overflowY: 'auto',
            fontSize: '16px',
            border: 'none', // Remove border
            padding: '8px', // Add padding
            boxSizing: 'border-box', // Ensure padding doesn't affect width
            outline: 'none', // Remove outline on focus
          }}
          onKeyDown={handleKeyDown}
        />
        <SendIcon
          onClick={handleSubmit}
          sx={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '35px', cursor: 'pointer' }}
        />
      </div>
      </Box>
    );
  };

  const ChatMessage = ({ sender, text ,isNew,isMostRecentBotMessage}) => {


    const [typingText, setTypingText] = useState('');

    useEffect(() => {
      if (isNew && isMostRecentBotMessage) {
        const typeWriter = () => {
          let i = 0;
          const speed = 10; // typing speed in milliseconds
          const message = text;
  
          const typingInterval = setInterval(() => {
            if (i < message.length) {
              setTypingText(prevText => prevText + message.charAt(i));
              i++;
            } else {
              clearInterval(typingInterval);
            }
          }, speed);
        };
  
        // Start typing effect
        typeWriter();
      }
    }, [isNew, isMostRecentBotMessage, text]);
  

          const renderIcon = () => {
            if (sender === 'You') {
              return <Avatar alt='John Doe' src='/images/avatars/3.png' sx={{ width: '2.1rem', height: '2.1rem',borderRadius: '5px' }} />;
            } else if (sender != 'You') {
              return <Avatar alt='John Doe' src='/images/avatars/bot.png' sx={{ width: '2.1rem', height: '2.1rem',borderRadius: '5px' }} />;
            } else {
              return null;
            }
          };
          const theme = useTheme();

          const lightModeStyles = {
            width: '100%',
            resize: 'none',
            overflowY: 'auto',
            fontSize: '13px',
            border: 'none', 
            padding: '8px', 
            boxSizing: 'border-box',
            outline: 'none',
          };
        
          // Define styles for dark mode
          const darkModeStyles = {
            width: '100%',
            resize: 'none',
            overflowY: 'auto',
            fontSize: '13px',
            border: 'none', 
            padding: '8px', 
            boxSizing: 'border-box',
            outline: 'none',
            color:'white',
            backgroundColor:'#312D4B'
          };
          const divStyleLight={
            width: '100%',boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '5px',
             border: '1px solid rgba(0,0,0,0.1)',marginLeft:'1%',marginBottom:'1%' 
          }
          const divStyleDark={
            width: '100%',
            borderRadius: '5px',
             border: '1px solid rgba(0,0,0,0.1)',marginLeft:'1%',marginBottom:'1%' 
          }
          const styles = theme.palette.mode === 'dark' ? darkModeStyles : lightModeStyles;
          const st= theme.palette.mode === 'dark' ? divStyleDark : divStyleLight;



    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2vh',alignItems: 'flex-start'  }}>
      {renderIcon()}
      <div style={st}>
        {sender !== 'You' ? (
          isMostRecentBotMessage && isNew ? (
            <div className="typing-effect" sx={{padding:'5px'}}>
              <TextareaAutosize
                readOnly 
                value={typingText}       
                style={styles}
              />
               
            </div>
            
          ) : (
            <TextareaAutosize
              value={text}
              readOnly
              style={styles}
            />
          )
        ) : (
          <TextareaAutosize
            value={text}
            readOnly
            style={styles}
          />
        )}
      </div>
    </div>
    );
  };



const TabAccount = () => {

  const [chatMessages, setChatMessages] = useState([]);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const [mostRecentBotMessageIndex, setMostRecentBotMessageIndex] = useState(-1);
  const typingTextRef = useRef('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('selectedRowData');
    if (!storedData) {
      localStorage.removeItem('chatMessages'); // Clear localStorage only if session data is not available
    } else {
      const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
      if (storedMessages) {
        setChatMessages(storedMessages);
      }
    }
  }, []);

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  
  useEffect(() => {
    // Retrieve data from session storage
    const storedData = sessionStorage.getItem('selectedRowData');
    if (storedData) {
      // Parse the data if it's in string format
      const parsedData = JSON.parse(storedData);
      setProjectData(parsedData);
    }
  }, []);
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (storedMessages) {
      setChatMessages(storedMessages);
    }
  }, []);

  const handleSubmitMessage = (message) => {
    const newMessage = { sender: 'You', text: message };
  const updatedMessages = [...chatMessages, newMessage];
  setChatMessages(updatedMessages);
  setIsUserTyping(true);

  // Save updated chat messages to local storage
  localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

  setTimeout(() => {
    const botResponse = { sender: 'Bot', text: `${message}`, isNew: true };
    const updatedMessagesWithBotResponse = [...updatedMessages, botResponse];
    setChatMessages(updatedMessagesWithBotResponse);
    setMostRecentBotMessageIndex(updatedMessagesWithBotResponse.length - 1);
    setIsUserTyping(false);

    localStorage.setItem('chatMessages', JSON.stringify(updatedMessagesWithBotResponse));
    
  }, 1000);
  };

  


  useEffect(() => {
    // Scroll to bottom when component mounts or chatMessages change
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Scroll to bottom when chat container height changes
    const chatContainer = chatContainerRef.current;
    const observer = new MutationObserver(scrollToBottom);
    if (chatContainer) {
      observer.observe(chatContainer, { childList: true, subtree: true });
    }
    return () => observer.disconnect();
  }, []);


  
  return (
    <>
    {projectData ? (
        <TableContainer sx={{ padding: "10px" }}>
          <Table sx={{ border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <TableHead>
              <TableRow sx={{ border: 'none' }}>
                <TableCell sx={{ height: '7px', border: 'none', color: '#0070D2', fontSize: '10px !important', fontWeight: 'bold', width: '450px', textAlign: 'left' }}>Active Project Name </TableCell>
                <TableCell sx={{ height: '7px', border: 'none', color: '#0070D2', fontSize: '10px !important', fontWeight: 'bold', textAlign: 'left' }}>Technologies</TableCell>
                <TableCell sx={{ height: '7px', border: 'none', color: '#0070D2', fontSize: '10px !important', fontWeight: 'bold', width: '150px', whiteSpace: 'nowrap', textAlign: 'left' }}>Created On</TableCell>
                <TableCell sx={{ height: '7px', border: 'none', color: '#0070D2', fontSize: '10px !important', fontWeight: 'bold', width: '150px', whiteSpace: 'nowrap', textAlign: 'left' }}>Created By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ border: 'none' }}>
                <TableCell sx={{ height: '7px', border: 'none', fontSize: "12px", fontWeight: 'bold' }}>{projectData.name}</TableCell>
                <TechBox sx={{ height: '7px', border: 'none', fontSize: "12px", mt: 2.5, fontWeight: 'bold' }}>
                  {projectData.tech.join(' | ')}
                </TechBox>
                <TableCell sx={{ height: '7px', border: 'none', fontSize: "12px", fontWeight: 'bold' }}>{projectData.createdOn}</TableCell>
                <TableCell sx={{ height: '7px', border: 'none', fontSize: "12px", fontWeight: 'bold' }}>{projectData.createdBy}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>Not Active Project</div>
      )}
        <CardContent sx={{ height: 'calc(100vh - 280px)' }}>
        
        <Box 
        id="chat-container" 
        ref={chatContainerRef}
        sx={{ height: 'calc(100vh - 300px)',width: '100%', overflowY: 'auto', padding: '1%',mt:'10px',
        '&::-webkit-scrollbar': {
          display: 'none' 
        }}}>

              <div style={{ width: '100%' }} ref={typingTextRef}>
              {chatMessages.map((message, index) => (
                        <ChatMessage
                        key={index}
                        sender={message.sender}
                        text={message.text}
                        isNew={message.isNew}
                        isMostRecentBotMessage={index === mostRecentBotMessageIndex}
                      />
                      ))}
                  {isUserTyping && ( 
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  Waiting for reply...
                </Typography>
              )}
            </div>
        
           
        </Box> 
        
        </CardContent>
        <ChatInput onSubmit={handleSubmitMessage} status={isUserTyping } /> 
    
    </>
  );
};

export default TabAccount;

