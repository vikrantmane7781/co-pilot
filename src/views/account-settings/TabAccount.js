// ** React Imports
import { useState ,useEffect,useRef} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { styled } from '@mui/material/styles'

import CardContent from '@mui/material/CardContent'

import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography';
import SendIcon from 'mdi-material-ui/SendCircle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar';
import PersonIcon from 'mdi-material-ui/FaceAgent';
import RobotIcon from 'mdi-material-ui/Robot';
import Typist from 'react-typist';



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
const StickyHeader = styled(CardHeader)({
  position: 'sticky',
  top: 0,
  zIndex: 1000, // Adjust the z-index as needed
 
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
        }}
      >
       <TextField
      type="text"
      placeholder="Type your message..."
      value={message}
      onChange={handleChange}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <SendIcon onClick={handleSubmit} sx={{ fontSize: '6vh' }} style={{ cursor: 'pointer'}}/>
        ),
      }}
      onKeyDown={handleKeyDown}
    />
      </Box>
    );
  };

  const ChatMessage = ({ sender, text ,isNew}) => {
    const renderIcon = () => {
      if (sender === 'You') {
        return <Avatar><PersonIcon /></Avatar>;
      } else if (sender != 'You') {
        return <Avatar><RobotIcon /></Avatar>;
      } else {
        return null;
      }
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '22px' }}>
        {renderIcon()}
        {sender != 'You' ? (
        isNew ? (
          <Typist>
            <span>{text}</span>
          </Typist>
        ) : (
          <span>{text}</span>
        )
      ) : (
        <span>{text}</span>
      )}
      </div>
    );
  };



const TabAccount = () => {

  const [chatMessages, setChatMessages] = useState([]);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  // Scroll to bottom whenever chatMessages or isUserTyping changes
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isUserTyping]);

  
  useEffect(() => {
    // Load chat messages from local storage when component mounts
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setChatMessages(JSON.parse(storedMessages));
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
    const botResponse = { sender: 'Bot', text: `Response to: ${message}`, isNew: true };
    const updatedMessagesWithBotResponse = [...updatedMessages, botResponse];
    setChatMessages(updatedMessagesWithBotResponse);
    setIsUserTyping(false);

    // Save updated chat messages with bot response to local storage
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessagesWithBotResponse));
  }, 1000);
  };




  return (
    <>
        <CardContent sx={{ height: 'calc(100vh - 200px)' }}>
        <Box 
        id="chat-container" 
        ref={chatContainerRef}
        sx={{ height: 'calc(100vh - 200px)',width: '100%', overflowY: 'auto', padding: '10px',mb:'22px'}}>

              <div style={{ width: '200px', wordWrap: 'break-word' }}>
              {chatMessages.map((message, index) => (
                        <ChatMessage key={index} sender={message.sender} text={message.text} />
                      ))}
                  {isUserTyping && (
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  You are typing...
                </Typography>
              )}
            </div>
       
            
        </Box>
        </CardContent>
      <ChatInput onSubmit={handleSubmitMessage} />
    
    </>
  );
};

export default TabAccount;

