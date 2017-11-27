import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {Provider} from 'react-redux';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './muiTheme.js';
import registerServiceWorker from './registerServiceWorker';
import App from './App';


ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </MuiThemeProvider>
    </BrowserRouter>,

    document.getElementById('root')
);

registerServiceWorker();
