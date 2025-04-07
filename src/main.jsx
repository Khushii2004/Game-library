import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/App.css';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';

// Clerk publishable key (test environment)

const PUBLISHABLE_KEY = "pk_test_bWVhc3VyZWQtY2xhbS02MS5jbGVyay5hY2NvdW50cy5kZXYk";


// Rendering the root component with necessary providers

ReactDOM.createRoot(document.getElementById("root")).render(

    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
   
    </ClerkProvider>
  
);
