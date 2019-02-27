import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme';
import ExerciseScreen from 'components/ExerciseScreen';
// import ExerciseSelection from 'pages/ExerciseSelection';

class IndexDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            question: {},
        };
    }


    render () {
        return (
            <MuiThemeProvider theme={theme}>
                Exercise Selection Screen
            </MuiThemeProvider>
            );
    }
}
ReactDOM.render(<IndexDashboard />, document.getElementById('app'));