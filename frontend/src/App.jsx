import React from 'react';
import {Card} from 'material-ui';
import Main from './Content.jsx';
import Header from './navbar/Header';

const style = {
    content: {
        maxWidth: '95%',
        margin: 'auto',
        marginTop: '5px'
    }
};

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Card style={style.content}>
                    <Main/>
                </Card>
            </div>
        );
    }
}

export default App;
