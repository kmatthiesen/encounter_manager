import React from 'react';
import './App.css';
import {Card} from 'material-ui';
import Main from './Main.jsx';
import Header from './navbar/Header';

const style = {
    base: {
        maxWidth: '95%',
        margin: 'auto',
        marginTop: '5px'
    },
};

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Card style={style.base}>
                    <Main/>
                </Card>
            </div>
        );
    }
}

export default App;
