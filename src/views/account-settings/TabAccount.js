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
import TextareaAutosize from '@mui/material/TextareaAutosize';



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

    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2vh',alignItems: 'flex-start'  }}>
      {renderIcon()}
      <div style={{ width: '100%',boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
       borderRadius: '5px',
        border: '1px solid rgba(0,0,0,0.1)',marginLeft:'1%',marginBottom:'1%' }}>
        {sender !== 'You' ? (
          isMostRecentBotMessage && isNew ? (
            <div className="typing-effect" sx={{padding:'5px'}}>
              <TextareaAutosize
                value={typingText}       
                style={{    
                  width: '100%', // Full width of parent container 
                  resize: 'none',
                  overflowY: 'auto',
                  fontSize: '14px',
                  border: 'none', // Remove border
                  padding: '8px', // Add padding
                  boxSizing: 'border-box', // Ensure padding doesn't affect width
                  outline: 'none', // Remove outline on focus
                }}
              />
               
            </div>
            
          ) : (
            <TextareaAutosize
              value={text}
              readOnly
              style={{
                width: '100%', // Full width of parent container
                resize: 'none',
                overflowY: 'auto',
                fontSize: '14px',
                border: 'none', // Remove border
                padding: '8px', // Add padding
                boxSizing: 'border-box', // Ensure padding doesn't affect width
                outline: 'none', // Remove outline on focus
              }}
            />
          )
        ) : (
          <TextareaAutosize
            value={text}
            readOnly
            style={{
              width: '100%', // Full width of parent container
              resize: 'none',
              overflowY: 'auto', 
              fontSize: '14px',
              border: 'none', // Remove border
              padding: '8px', // Add padding
              boxSizing: 'border-box', // Ensure padding doesn't affect width
              outline: 'none', // Remove outline on focus
            }}
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

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleNewMessage = () => {
    scrollToBottom();
  };



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
    window.addEventListener('beforeunload', function() {
      localStorage.clear();
    });
  
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', function() {
        localStorage.clear();
      });
    };
  }, []);
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
        <CardContent sx={{ height: 'calc(100vh - 170px)' }}>
        <Typography>Active Project: ::::</Typography>
        <Box 
        id="chat-container" 
        ref={chatContainerRef}
        sx={{ height: 'calc(100vh - 200px)',width: '100%', overflowY: 'auto', padding: '1%',mt:'10px',
        '&::-webkit-scrollbar': {
          display: 'none' // Hide scrollbar for WebKit browsers
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
        <ChatInput onSubmit={handleSubmitMessage} /> 
    
    </>
  );
};

export default TabAccount;

