import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CodeContainer from 'Pages/Exercise/CodeContainer/index';
import FeedbackModal from 'Pages/Exercise/FeedbackModal/index';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            currentCode: this.props.data.startCode,
            feedbackOpen: false,
            feedbackTotal: 0,
            feedbackList: false,
            wrongBlocks: {
                indexWrong: [],
                indentWrong: [],
            },
        };
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
        for (let i = 0; i < blockList.length ; i++) {
            if (blockList[i].id === 0) {
                break;
            }
            currentList.push(blockList[i]);
        }

        // validate blocks
        for (let i = 0; i < currentList.length ; i++) {
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
                marks-=0.5;
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



        this.setState({
            feedbackOpen: true,
            feedbackTotal: total,
            feedbackList: feedback,
            wrongBlocks: wrongBlocks,
        });

    };

    getCurrentCode = (blocks) => {
        this.setState({
            currentCode: blocks,
        })
    };

    closeModal = () => {
      this.setState({
          feedbackOpen: false
      })
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Typography variant="h3" gutterBottom>
                    {this.props.data.question}
                </Typography>

                <CodeContainer
                    data={this.props.data}
                    wrongBlocks={this.state.wrongBlocks}
                    getCurrentCode={(blocks) => this.getCurrentCode(blocks)}
                    resetError={this.resetError}
                />

                <div className={classes.buttonSection}>
                    <Button onClick={this.props.handleBack} variant="contained" color="secondary" className={classes.button}> Back </Button>
                    <Button onClick={this.handleCheck} variant="contained" color="secondary" className={classes.button}> Check </Button>
                </div>

                { this.state.feedbackOpen ? (<FeedbackModal
                    feedbackTotal={this.state.feedbackTotal}
                    feedbackList={this.state.feedbackList}
                    handleClose={this.closeModal}
                 />) : ''}

            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(withStyles(Style)(Exercise));
