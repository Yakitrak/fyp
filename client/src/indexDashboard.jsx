import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme';
import ExerciseScreen from 'components/ExerciseScreen';

import exampleQ1 from 'exercises/example1.json';
import exampleQ2 from 'exercises/example2.json';

class IndexDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            question: {},
        };
    }

    // temporary question navigation
    componentDidMount() {
        let question = window.location.href.substr(-1);
        if (question === '1') {
             this.setState({
                 question: exampleQ1,
             });
        } else if (question === '2') {
            this.setState({
                question: exampleQ2,
            });
        }

    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <ExerciseScreen data={ this.state.question}/>
            </MuiThemeProvider>
            );
    }
}
ReactDOM.render(<IndexDashboard />, document.getElementById('app'));