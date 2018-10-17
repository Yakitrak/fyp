import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { theme } from 'theme';
import ExerciseCreator from 'components/ExerciseCreator';
import { Scrollbars } from 'react-custom-scrollbars';

class Index extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <Scrollbars  style={{ width: '100vw', height: '100vh', background: theme.palette.primary.main }}>
                    <ExerciseCreator/>
                </Scrollbars>
            </MuiThemeProvider>
            );
    }
}
ReactDOM.render(<Index />, document.getElementById('app'));