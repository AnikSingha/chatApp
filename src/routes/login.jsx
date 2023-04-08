import { Box } from '@mui/material';
import LoginBox from '../components/loginBox';

function Login() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <LoginBox />
    </Box>
  );
}

export default Login;