import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleOAuthProvider} from "@react-oauth/google";

axios.defaults.withCredentials = true;
const CLIENT_ID = "340784962837-katothpseelomf0sqa0eptgal9g33h1r.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
    </GoogleOAuthProvider>
);