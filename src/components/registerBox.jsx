import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth, useFirestore, useStorage} from 'reactfire';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Alert } from '@mui/material';



function RegisterBox() {
  
    const auth = useAuth()
    const firestore = useFirestore()
    const storage = useStorage()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassAlert, setShowPassAlert] = useState(false)
    const [showEmailAlert, setShowEmailAlert] = useState(false)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const navigate = useNavigate()
  
    const submit = async (e) => {
      e.preventDefault()

      if (password && password.length < 6 || !password) {
        setShowPassAlert(true)
      }

      if (email && !emailRegex.test(email) || !password){
        setShowEmailAlert(true)
      }
  
      try {
        if (email && password && emailRegex.test(email)) {
          await createUserWithEmailAndPassword(auth, email, password);
          const uid = auth.currentUser.uid;
          const usersRef = collection(firestore, 'users')
          const username = email.split("@")[0]
          const defaultPfpUrl = "gs://chat-e9c29.appspot.com/default_Profile_pic.jfif"
          const newDoc = {email: email, username: username, pfp: defaultPfpUrl}
          await setDoc(doc(usersRef, uid), newDoc)
          navigate('/profile');
        }
      } catch (error) {
        //console.log(error.message);
      }
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
          Sign Up
        </Typography>
        {showEmailAlert && (
            <>
            <Alert severity="error">
                Invalid email entered
            </Alert>
            <br/>
            </>
        )}
        {showPassAlert && (
          <Alert severity="error">
            Password must be at least 6 characters long.
          </Alert>
        )}
        <form>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            margin="normal"
            fullWidth
            onChange={(e) => {setEmail(e.target.value); setShowEmailAlert(false)}}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#444654' },
            }}
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            margin="normal"
            fullWidth
            type="password"
            onChange={(e) => {setPassword(e.target.value); setShowPassAlert(false)}}
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
          <Typography variant="body1" gutterBottom sx={{ marginTop: '20px' }}>
            Already have an Account? <a onClick={() => {navigate('/')}} style={{ color: '#ADD8E6', cursor: 'pointer'}}>Log in</a>
          </Typography>
        </form>
      </Box>
    );
  }
  
  export default RegisterBox;