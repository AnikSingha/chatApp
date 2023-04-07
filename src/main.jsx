import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.background.default }}>
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
)
