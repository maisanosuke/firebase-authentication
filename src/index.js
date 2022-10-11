import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AuthProvider } from "./context/AuthContext";
import { FlashProvider } from './context/FlashContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <FlashProvider>
        <AuthProvider>
        <App />
        </AuthProvider>
      </FlashProvider>
  </React.StrictMode>
);


