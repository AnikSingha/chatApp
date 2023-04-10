import { Box } from '@mui/material';
import ProfilePage from '../components/profilePage';

function Profile() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <ProfilePage />
    </Box>
  );
}

export default Profile;