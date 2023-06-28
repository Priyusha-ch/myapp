import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Auth0Provider domain="dev-jx204ifax2tpok03.us.auth0.com"
          clientId="NdZy6zFEN5GXX5TQILFVIrLQ953jYDg5"
          authorizationParams={{redirect_uri: window.location.origin }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0Provider>
 
);

