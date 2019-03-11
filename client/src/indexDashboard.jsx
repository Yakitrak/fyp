import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme';
import ExerciseSelection from 'Pages/ExerciseSelection';
import Topbar from 'components/TopBar';
import ExericseQuestion from 'Pages/Exercise';

class IndexDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            questionData: {},
            showQuestion: false,
        };
    }

    handleQuestionClick = (question) => {
        console.log(question);
        this.setState({
            showQuestion: true,
            questionData: question,
        })
    };

    handleBack = () => {
        console.log('hi');
        this.setState({
            showQuestion: false,
        })
    };


    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <Topbar />
                {this.state.showQuestion ? (
                    <ExericseQuestion
                        data={this.state.questionData}
                        handleBack={this.handleBack}
                    />
                ) : (
                    <ExerciseSelection
                        handleQuestionClick={this.handleQuestionClick}
                    />
                )}
            </MuiThemeProvider>
            );
    }
}
ReactDOM.render(<IndexDashboard />, document.getElementById('app'));