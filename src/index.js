import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './theme'
import { Auth0Provider } from '@auth0/auth0-react';


document.body.style.backgroundColor = theme.palette.background.appBackground;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <ThemeProvider theme={theme} >
        <Main />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);


reportWebVitals();
