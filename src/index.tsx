import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './style/App.css';
import { RouterProvider } from 'react-router-dom';
import {wordleRouter} from './router'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( 
  <React.StrictMode>
      <RouterProvider router={wordleRouter} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals