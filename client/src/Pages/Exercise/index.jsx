import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CodeContainer from 'Pages/Exercise/CodeContainer/index';
import FeedbackModal from 'Pages/Exercise/FeedbackModal/index';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CloseIcon from 'mdi-react/CloseIcon';
import Axios from "axios";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

function getSteps() {
    return ['Vertical Positioning',
        'Horizontal Positioning',
        'Feedback'];
}

function getStepsDesc() {
    return ['Drag the appropriates lines of code above the red line, anything below will not be marked. ',
        'Indent the lines correctly by dragging or using the buttons located on the right',
        'Click "Check" when you are happy with your solution!'];
}


class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            data: this.props.data,
            currentCode: this.props.data.startCode,
            feedbackOpen: false,
            feedbackTotal: 0,
            feedbackList: false,
            wrongBlocks: {
                indexWrong: [],
                indentWrong: [],
            },
            tutorialActive: false,
            tutorialSteps: {
                vertical: false,
                horizontal: false,
                feedback: false,
            }
        };
    }

    componentWillMount() {
        console.log(this.props.data);

        if (this.props.data.starter) {
            this.setState({
                tutorialActive: true,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            currentCode: nextProps.data.startCode,
        });
    }

    resetError = () => {
        this.setState({
            wrongBlocks: {
                indexWrong: [],
                indentWrong: [],
            },
        })
    };

    handleCheck = () => {
        let correctList = this.state.data.correctCode;
        let blockList = this.state.currentCode;
        let currentList = [];
        let marks = 0;
        let feedback = [];
        let wrongBlocks = {
            indexWrong: [],
            indentWrong: [],
        };

        // determine blocks to be marked
        for (let i = 0; i < blockList.length; i++) {
            if (blockList[i].id === 0) {
                break;
            }
                currentList.push(blockList[i]);
        }

        // validate blocks
        for (let i = 0; i < currentList.length; i++) {
            let currentBlock = currentList[i];
            let correctBlock = correctList[i];

            // define block if doesn't exist
            if (!correctBlock) correctBlock = {id: -1};

            // check block is in correct position
            if (currentBlock.id === correctBlock.id) {
                // full correct
                if (correctBlock.indent === currentBlock.indent) {
                    marks += 1
                }
                // position correct but too wrong indentation
                else {
                    if (!feedback.includes('indent')) feedback.push('indent');
                    wrongBlocks.indentWrong.push(currentBlock.id);
                    marks += 0.8;
                }
                // full wrong
            } else if (currentBlock.id !== correctBlock.id) {
                wrongBlocks.indexWrong.push(currentBlock.id);
            }
        }

        // too many blocks
        if (currentList.length > correctList.length) {
            feedback.push('extra');
            if (marks > 1) {
                marks -= 0.5;
            }
        }

        // too little blocks
        if (currentList.length < correctList.length) {
            if (currentList.length === 0) {
                feedback.push('empty');
            } else {
                feedback.push('few');
            }
        }

        // calculate score
        let totalPossible = correctList.length;
        let total = (marks / totalPossible) * 100;

        if (total !== 100 && correctList.length === currentList.length && !feedback.includes('indent')) {
            feedback.push('arrange');
        }

        this.tutorialStepsUpdate('feedback');

        if (this.props.data.isComplete === false || total > this.props.data.score) {
            // update question progress for user
            Axios.post('/updateUserQuestionProgress', {
                question_id: this.props.data._id,
                score: total,
            })
                .then((resp) => {
                    if(resp.data.success) {
                        console.log('Question progress for user updated!')
                    }
                })
                .catch((err) => {
                    console.log("User questions update error: ", err);
                });

            // if 100% and not already complete
            if (total === 100 && this.props.data.isComplete === false) {
                // change skill level
                Axios.post('/updateUserSkill', {
                    updateValues: this.props.data.skills.granted,
                })
                    .then((resp) => {
                        if(resp.data.success) {
                            console.log('User skill level updated and new questions added!')
                        }
                    })
                    .catch((err) => {
                        console.log("User skill level update error: ", err);
                    });
            }


        }

        this.setState({
            feedbackOpen: true,
            feedbackTotal: total,
            feedbackList: feedback,
            wrongBlocks: wrongBlocks,
        });

        this.props.updateStats();


    };

    getCurrentCode = (blocks) => {
        this.setState({
            currentCode: blocks,
        })
    };

    tutorialStepsUpdate = (step) => {
        const { tutorialSteps } = this.state;

        if (step === 'feedback' && tutorialSteps.horizontal && tutorialSteps.vertical) {
            this.setState({
                activeStep: 3,
            });
            this.handleTutorialClose(false);
        } else if (step === 'horizontal') {
            this.setState({
                activeStep: 2,
            });
        } else if (step === 'vertical') {
            this.setState({
                activeStep: 1,
            });        }

        this.setState({
            tutorialSteps: { ...tutorialSteps, [step]: true },
        });

    };

    handleTutorialClose = () => {
        this.setState({
            tutorialActive: false,
            activeStep: 3,
        })
    };

    closeModal = () => {
        this.setState({
            feedbackOpen: false
        })
    };

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;
        const steps = getSteps();
        const stepsDesc = getStepsDesc();

        return (
            <div className={classes.root}>

                <div className={classes.topSection}>
                    <div style={{ paddingLeft: '15vw', paddingRight: '15vw' }}>
                        <Typography variant="h6" gutterBottom style={{ textAlign: 'left'}}>
                            { ReactHtmlParser(this.props.data.question) }
                        </Typography>
                    </div>

                    <CodeContainer
                        data={this.props.data}
                        wrongBlocks={this.state.wrongBlocks}
                        getCurrentCode={(blocks) => this.getCurrentCode(blocks)}
                        resetError={this.resetError}
                        tutorialStepsUpdate={(step) => this.tutorialStepsUpdate(step)}
                        tutorialActiveVertical={activeStep === 0}
                        tutorialActiveHorizontal={activeStep === 1}
                    />

                    <div className={classes.buttonSection}>
                        <Button onClick={this.props.handleBack} variant="contained" color="primary" > Back </Button>
                        <Button onClick={this.handleCheck} className={activeStep === 2 ? classes.pulseButton: ''} variant="contained" color="primary" > Check </Button>
                    </div>

                    {this.state.feedbackOpen ? (<FeedbackModal
                        feedbackTotal={this.state.feedbackTotal}
                        feedbackList={this.state.feedbackList}
                        handleClose={this.closeModal}
                    />) : ''}
                </div>

                {this.state.tutorialActive ?
                    ( <Card style={{ width: '100%' }}>
                            <CardHeader
                                title="Welcome to the tutorial"
                                subheader="Please read and follow the steps"
                                action={
                                    <IconButton>
                                        <CloseIcon onClick={this.handleTutorialClose}/>
                                    </IconButton>
                                }
                            />
                            <CardContent>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {steps.map((label, index) => {
                                        const stepProps = {};
                                        const labelProps = {};
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                {activeStep === steps.length ? (
                                    <Typography variant="body1" gutterBottom>
                                        Tutorial Complete! You can now close this!
                                    </Typography>
                                ) : (
                                    <Typography variant="body1" gutterBottom>
                                        {stepsDesc[activeStep]}
                                        </Typography>
                                )}
                            </CardContent>
                        </Card>
                    ) : ''}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(withStyles(Style)(Exercise));
