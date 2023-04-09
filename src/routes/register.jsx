import { Box } from '@mui/material';
import RegisterBox from '../components/registerBox';

function Register() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <RegisterBox />
    </Box>
  );
}

export default Register;