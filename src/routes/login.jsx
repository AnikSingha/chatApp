import { Box } from '@mui/material';
import CenterBox from '../components/centerBox';

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
      <CenterBox />
    </Box>
  );
}

export default Login;