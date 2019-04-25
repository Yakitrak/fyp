import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme';
import ExerciseSelection from 'Pages/ExerciseSelection';
import Topbar from 'components/TopBar';
import ExericseQuestion from 'Pages/Exercise';
import Statistics from 'components/Statistics';
import Axios from "axios/index";

class IndexDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            questionData: {},
            showQuestion: false,
            statOverlay: false,
            skills: {},
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

        Axios.get('/getUserSkill')
            .then((resp) => {
                if(resp.data.success){
                    this.setState({
                        skills: resp.data.skills,
                        statOverlay: !this.state.statOverlay
                    });
                } else {
                    console.log('Skill Display Updated');
                }
            })
            .catch((err) => {
                console.log("Can't display skill!", err);
            });
   };

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                <Topbar
                    showStatistics={this.showStatistics}
                />
                    <div style={{ display: 'flex', flexDirection: ' row' }}>
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
                            <Statistics
                                skills={this.state.skills}
                            />
                        ) : '' }
                </div>
            </MuiThemeProvider>
            );
    }
}
ReactDOM.render(<IndexDashboard />, document.getElementById('app'));