import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HttpsRedirect from 'react-https-redirect';

ReactDOM.render(
  <React.StrictMode>
    <HttpsRedirect>
      <App />
    </HttpsRedirect>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();