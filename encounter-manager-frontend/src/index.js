import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './muiTheme.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>,

    document.getElementById('root')
);

registerServiceWorker();
