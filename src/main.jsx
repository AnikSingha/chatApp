import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { app, auth, firestore, storage } from '../firebase';
import { FirebaseAppProvider, AuthProvider, FirestoreProvider, StorageProvider } from 'reactfire';


ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseAppProvider firebaseApp={app}>
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>
          <React.StrictMode>
              <ThemeProvider theme={theme}>
                <div style={{ backgroundColor: theme.palette.primary.main, height: '100vh'}}>
                  <App />
                </div>
              </ThemeProvider>
          </React.StrictMode>
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  </FirebaseAppProvider>
)
