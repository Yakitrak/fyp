import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { theme } from 'theme';
import ExerciseCreator from 'components/ExerciseCreator';
import exampleData from 'exercises/example';

class Index extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                    <ExerciseCreator data={exampleData}/>
            </MuiThemeProvider>
            );
    }
}
ReactDOM.render(<Index />, document.getElementById('app'));