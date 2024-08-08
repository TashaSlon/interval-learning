import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './services/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}> 
            <App />
        </Provider>
    </BrowserRouter> 
);

reportWebVitals();
