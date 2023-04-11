import { Box, Button, TextField, Typography, Avatar } from '@mui/material';
import { useAuth, useFirestore, useStorage } from 'reactfire';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL, } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  
  const auth = useAuth()
  const uid = auth.currentUser?.uid
  const firestore = useFirestore()
  const storage = useStorage()
  const [pfp, setPfp] = useState()
  const navigate = useNavigate()
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const userRef = doc(collection(firestore, 'users'), uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const pfpRef = ref(storage, userDoc.data().pfp);
            setPfp(await getDownloadURL(pfpRef));
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    });
    return unsubscribe;
  }, []);

    const submit = async() => {

    }
  
    return (
      <Box
        sx={{
          backgroundColor: '#545664',
          borderRadius: '15px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          minWidth: '300px',
          maxWidth: '400px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Your Profile
        </Typography>
        <br/>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar src={pfp} sx={{ width: 100, height: 100 }} />
        </div>
        <br/>
        <form>
          <TextField
            id="username"
            label="Username"
            variant="filled"
            margin="normal"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#444654' },
            }}
          />
          <Button variant="contained" fullWidth sx={{backgroundColor:"#343644", marginTop: "20px"}} onClick={submit}>
            Submit
          </Button>
        </form>
      </Box>
    );
  }
  
  export default ProfilePage;