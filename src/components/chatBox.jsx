import { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useFirestore, useAuth, useStorage } from 'reactfire';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, getDownloadURL, } from 'firebase/storage';

function Chat() {
  const auth = useAuth();
  const firestore = useFirestore();
  const storage = useStorage()
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);
  const [userProfilePictures, setUserProfilePictures] = useState({});
  const [userData, setUserData] = useState({});

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
      console.log(userProfilePictures);
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
        {messageData.map((msg) => {
          const isCurrentUser = msg.senderID === auth.currentUser?.uid;
          const profilePicture = userProfilePictures[msg.senderID];
          const username = userData[msg.senderID]?.username || "Unknown User";
          return (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                marginBottom: '0.5rem',
                alignItems: isCurrentUser ? 'flex-end' : 'flex-start'
              }}
            >
              <Box sx={{ color: "#AAA", fontSize: "0.8rem" }}>{username}</Box>
              <Box
                sx={{
                  display: 'flex',
                  maxWidth: '70%',
                  padding: '0.5rem',
                  backgroundColor: isCurrentUser ? '#8BC34A' : '#E0E0E0',
                  borderRadius: '1rem'
                }}
              >
                {!isCurrentUser && (
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundImage: profilePicture ? `url(${profilePicture})` : 'none',
                      backgroundSize: 'cover',
                      marginRight: '0.5rem'
                    }}
                  />
                )}
                <Box sx={{ color: isCurrentUser ? '#FFF' : '#000' }}>{msg.text}</Box>
                {isCurrentUser && (
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundImage: profilePicture ? `url(${profilePicture})` : 'none',
                      backgroundSize: 'cover',
                      marginLeft: '0.5rem'
                    }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
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






