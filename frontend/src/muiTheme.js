import {grey900, grey50} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
    },
    toolbar: {
        backgroundColor: grey900,
        separatorColor: grey50
    }
});

export default muiTheme;