import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme';
import ExerciseSelection from 'Pages/ExerciseSelection';
import Topbar from 'components/TopBar';
import ExericseQuestion from 'Pages/Exercise';
import Statistics from 'components/Statistics';

class IndexDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            questionData: {},
            showQuestion: false,
            statOverlay: false,
        };
    }

    handleQuestionClick = (question) => {
        this.setState({
            showQuestion: true,
            questionData: question,
        })
    };

    handleBack = () => {
        this.setState({
            showQuestion: false,
        })
    };

    showStatistics = () => {
       this.setState({
           statOverlay: !this.state.statOverlay
       });
   };

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <Topbar
                    showStatistics={this.showStatistics}
                />
                {this.state.showQuestion ? (
                    <ExericseQuestion
                        data={this.state.questionData}
                        handleBack={this.handleBack}
                    />
                ) : (
                    <ExerciseSelection
                        handleQuestionClick={this.handleQuestionClick}
                        showOverlay={this.state.statOverlay}
                    />
                )}
                {this.state.statOverlay ? (
                    <Statistics/>
                ) : '' }
            </MuiThemeProvider>
            );
    }
}
ReactDOM.render(<IndexDashboard />, document.getElementById('app'));