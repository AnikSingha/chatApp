import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useAuth } from 'reactfire';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/')
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
  <AppBar position="fixed" sx={{ height: '40px'}}>
    <Toolbar>
      <Box sx={{ marginLeft: 'auto' }}>
        <Button sx={{ color: '#fff', paddingBottom: "25px" }} onClick={handleLogout}>Logout</Button>
        <Button sx={{ color: '#fff', paddingBottom: "25px" }} onClick={handleProfile}>Profile</Button>
      </Box>
    </Toolbar>
  </AppBar>
);
};

export default Navbar;