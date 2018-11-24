import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme';
import ExerciseScreen from 'components/ExerciseScreen';
import exampleData from 'exercises/example.json';

class Index extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <ExerciseScreen data={exampleData}/>
            </MuiThemeProvider>
            );
    }
}
ReactDOM.render(<Index />, document.getElementById('app'));