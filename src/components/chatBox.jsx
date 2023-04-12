import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Avatar, Tooltip } from '@mui/material';
import { useFirestore, useAuth, useStorage } from 'reactfire';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL, } from 'firebase/storage';
import Navbar from './navbar';

function Chat() {
  const auth = useAuth();
  const firestore = useFirestore();
  const storage = useStorage()
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);
  const [userProfilePictures, setUserProfilePictures] = useState({});
  const [userData, setUserData] = useState({});
  const dummy = useRef();
  let prevUser = ''

  useEffect(() => {
    const q = query(collection(firestore, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setMessageData(data);
    });
    return () => unsubscribe();
  }, [firestore]);

  useEffect(() => {
    const fetchProfilePictures = async () => {
      const usersCollectionRef = collection(firestore, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);
      const pfpPromises = [];
      const userData = {}
  
      querySnapshot.forEach((doc) => {
        userData[doc.id] = doc.data();
        const pfpRef = ref(storage, doc.data().pfp);
        const pfpPromise = getDownloadURL(pfpRef).then((url) => {
          return { [doc.id]: url };
        });
        pfpPromises.push(pfpPromise);
      });
  
      setUserData(userData)
      const pfps = await Promise.all(pfpPromises);
      const userProfilePictures = Object.assign({}, ...pfps);
      setUserProfilePictures(userProfilePictures);
    };
  
    fetchProfilePictures();
  }, [firestore, storage]);

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
    prevUser = userData[newMessage.senderID]?.username
    dummy.current.scrollIntoView({behavior: "smooth"});
  };

  return (
    <>
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
    <Navbar/>
      {/*
      <Box
        sx={{
          width: '250px',
          backgroundColor: '#444654',
          padding: '1rem',
          borderRight: '0px solid #ccc',
        }}
      >
        { Sidebar code here }
      </Box>
      */
      }
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginTop: "30px"
        }}
      >
        <Box sx={{ flexGrow: 1, padding: '1rem', overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
        {messageData.map((msg) => {
          const isCurrentUser = msg.senderID === auth.currentUser?.uid;
          const profilePicture = userProfilePictures[msg.senderID] || null;
          const username = userData[msg.senderID]?.username || "Unknown User";
          const timestamp = msg.timestamp ? msg.timestamp.toDate().toLocaleString() : '';
          const shouldDisplayUsername = username !== prevUser;
          prevUser = username
          return (
            <>
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                marginBottom: '-0.5rem',
                alignItems: isCurrentUser ? 'flex-end' : 'flex-start'
              }}
            >
              {shouldDisplayUsername && (
                <Box
                  sx={{
                    color: '#AAA',
                    fontSize: '0.8rem',
                    justifyContent: 'center',
                    marginLeft: isCurrentUser ? '0px' : '8px',
                    marginRight: isCurrentUser ? '12px' : '0px',
                    marginBottom: '2px'
                  }}
                >
                  {username}
                </Box>
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  maxWidth: '70%',
                  marginBottom: '0.5rem'
                }}
              >
                <div
                  style={{
                    visibility: shouldDisplayUsername ? 'visible' : 'hidden',
                    marginRight: '0.5rem'
                  }}
                >
                  {!isCurrentUser && (
                    <Avatar
                      src={profilePicture}
                      alt={username}
                      sx={{ width: '40px', height: '40px' }}
                    />
                  )}
                </div>
                <Tooltip title={timestamp} arrow>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: '100%',
                      wordWrap: 'break-word',
                      backgroundColor: isCurrentUser ? '#E0E0E0' : '#E0E0E0',
                      borderRadius: '1rem',
                      padding: '0.5rem'
                    }}
                  >
                    <Box>{msg.text}</Box>
                  </Box>
                </Tooltip>
                <div
                  style={{
                    visibility: shouldDisplayUsername ? 'visible' : 'hidden',
                    marginLeft: '0.5rem'
                  }}
                >
                  {isCurrentUser && (
                    <Avatar
                      src={profilePicture}
                      alt={username}
                      sx={{ width: '40px', height: '40px' }}
                    />
                  )}
                </div>
              </Box>
            </Box>
            <br/>
            </>
          );
        })}
        <div ref={dummy}></div>
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
              <Button variant="contained" type="submit" sx={{backgroundColor: "#E0E0E0", color: "black"}}>Send</Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
    </>
  );
}

export default Chat;

