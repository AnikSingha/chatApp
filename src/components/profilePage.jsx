import { Box, Button, TextField, Typography, Avatar, IconButton, Stack } from '@mui/material';
import { useAuth, useFirestore, useStorage } from 'reactfire';
import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  
    const auth = useAuth()
    const uid = auth.currentUser?.uid
    const firestore = useFirestore()
    const storage = useStorage()
    const [pfp, setPfp] = useState()
    const [newPfp, setNewPfp] = useState()
    const [username, setUsername] = useState()
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
              setUsername(userDoc.data().username)
            }
          } catch (error) {
            console.log("Error:", error);
          }
        }
      });
      return unsubscribe;
    }, []);

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      const storageRef = ref(storage, `${uid}/profile/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setNewPfp(downloadUrl);
      
      // Update Firestore collection with new profile picture
      const userRef = doc(collection(firestore, 'users'), uid);
      await updateDoc(userRef, { pfp: storageRef.fullPath });
    };

    const submit = async () => {
      try {
        const userRef = doc(collection(firestore, 'users'), uid);
        await updateDoc(userRef, { username: username });
        navigate('/chat');
      } catch (error) {
        console.log("Error:", error);
      }
    };
     
  
    return (
      <Box
        sx={{
          backgroundColor: "#545664",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          minWidth: "300px",
          maxWidth: "400px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Your Profile
        </Typography>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {newPfp ? (
            <Avatar src={newPfp} sx={{ width: 100, height: 100 }} />
          ) : (
            <Avatar src={pfp} sx={{ width: 100, height: 100 }} />
          )}
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleFileUpload}
              />
            </Button>
          </Stack>
        </div>
        {newPfp && (
          <Typography variant="body1" sx={{ color: "#A0A0A0", marginTop: "20px" }}>
            New profile picture uploaded.
          </Typography>
        )}
        <br />
        <form>
          <TextField
            id="username"
            label="Username"
            variant="filled"
            margin="normal"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff", backgroundColor: "#444654" },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#343644", marginTop: "20px" }}
            onClick={submit}
          >
            Chat
          </Button>
        </form>
      </Box>
    );
  }
  
  export default ProfilePage;