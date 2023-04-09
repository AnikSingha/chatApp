import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { useState, useEffect } from 'react';

function RegisterBox() {
  
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
        Sign Up
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
          Already have an Account? <a onClick={() => {navigate('/login')}} style={{ color: '#ADD8E6', cursor: 'pointer' }}>Log in</a>
        </Typography>
      </form>
    </Box>
  );
}

export default RegisterBox;