import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme';
import ExerciseScreen from 'components/ExerciseScreen';

class IndexWelcome extends React.Component {
    constructor() {
        super();
        this.state = {
            question: {},
        };
    }

    componentDidMount() {
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <div> Login  </div>
            </MuiThemeProvider>
            );
    }
}
ReactDOM.render(<IndexWelcome />, document.getElementById('app'));