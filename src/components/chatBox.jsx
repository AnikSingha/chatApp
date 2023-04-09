import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useFirestore, useAuth } from 'reactfire';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Chat() {

  const auth = useAuth();
  const firestore = useFirestore();
  const [message, setMessage] = useState('');

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messagesRef = collection(firestore, 'messages');
    const newMessage = {
      senderID: auth.currentUser?.uid || 'anonymous',
      text: message,
      timestamp: serverTimestamp(),
    };
    await addDoc(messagesRef, newMessage);
    setMessage('');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        sx={{
          width: '250px',
          backgroundColor: '#444654',
          padding: '1rem',
          borderRight: '0px solid #ccc',
        }}
      >
        {/* Sidebar code here */}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        }}
      >
        <Box sx={{ flexGrow: 1, padding: '1rem', overflowY: 'auto' }}>
          {/* Chat message display here */}
        </Box>
        <form onSubmit={handleSendMessage}>
          <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
            <TextField
              id="message"
              variant="outlined"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{
                sx: {
                  backgroundColor: '#40414F',
                  borderRadius: '0.5rem',
                  color: "#FFFFFF"
                },
              }}
            />
            <Box sx={{ marginLeft: '1rem' }}>
              <Button variant="contained" type="submit">Send</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Chat;
