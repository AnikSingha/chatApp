import { Box, Button, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginBox() {
  
  const auth = useAuth()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        backgroundColor: '#545664',
        borderRadius: '4px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        minWidth: '300px',
        maxWidth: '400px',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
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
        <TextField
          id="password"
          label="Password"
          variant="filled"
          margin="normal"
          fullWidth
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            style: { color: '#fff' },
          }}
          InputProps={{
            style: { color: '#fff', backgroundColor: '#444654' },
          }}
        />
        <Button variant="contained" fullWidth sx={{backgroundColor:"#343644", marginTop: "20px"}}>
          Submit
        </Button>
        <Typography variant="body1" gutterBottom sx={{ marginTop: '20px' }}>
          Don't have an account? <a onClick={() => {navigate('/register')}} style={{ color: '#ADD8E6', cursor: 'pointer' }}>Sign Up</a>
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ marginTop: '20px' }}>
          Or sign in with
          <Box component="span" sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <FontAwesomeIcon icon={faGoogle} style={{ color: '#fff', fontSize: '2rem', margin: '0 5px' }} />
            <FontAwesomeIcon icon={faFacebook} style={{ color: '#fff', fontSize: '2rem', margin: '0 5px' }} />
            <FontAwesomeIcon icon={faTwitter} style={{ color: '#fff', fontSize: '2rem', margin: '0 5px' }} />
          </Box>
        </Typography>
      </form>
    </Box>
  );
}

export default LoginBox;