import { Box, Button, TextField, Typography } from '@mui/material';

function LoginBox() {
  return (
    <Box
      sx={{
        backgroundColor: '#545664', //444654 545664
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
          InputLabelProps={{
            style: { color: '#fff' },
          }}
          InputProps={{
            style: { color: '#fff', backgroundColor: '#444654' },
          }}
        />
        <Button variant="contained" fullWidth 
            sx={{backgroundColor:"#343644", marginTop: "20px"}}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default LoginBox;
