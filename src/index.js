import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthProvider } from './AuthContext';
import { BrowserRouter, Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
           <AuthProvider>
                <App />
            </AuthProvider>  
        </BrowserRouter>
    </React.StrictMode>
);