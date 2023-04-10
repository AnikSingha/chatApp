import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { useState } from 'react';
import { useStorage } from 'reactfire';

function ProfilePage() {
  
    const auth = useAuth()
    const [username, setUsername] = useState()
    const storage = useStorage()
    const navigate = useNavigate()
  
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