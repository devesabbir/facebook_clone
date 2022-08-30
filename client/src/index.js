import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import Provider from './States/Provider';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <Provider>
          <BrowserRouter>  
            <App/> 
         </BrowserRouter>
     </Provider>
   
);
