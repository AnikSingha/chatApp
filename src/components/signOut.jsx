import { useAuth } from 'reactfire';
import Button from '@mui/material/Button';

function SignOut() {
  const auth = useAuth();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Do any additional cleanup or navigation here
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
}

export default SignOut;