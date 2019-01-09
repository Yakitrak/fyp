import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CodeContainer from 'components/CodeContainer';
import FeedbackModal from 'components/FeedbackModal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            currentCode: this.props.data.startCode,
            feedbackOpen: false,
        };
    }

    handleBack = () => {
        alert('No Back Yet');
    };

    handleCheck = () => {
        let correctList = this.state.data.correctCode;
        let currentList = this.state.currentCode;

        console.log(correctList);
        console.log(currentList);

        // currentList.forEach((block, index) => {
        //     if (block.id === 0) {
        //         console.log('end of marking');
        //     }
        //     else if (block.id === correctList[index].id) {
        //         console.log('correct');
        //     } else {
        //         console.log('wrong');
        //     }
        // });

        // work out point system
        let linePoint = 100 / correctList.length;
        let totalPoints = 0;

        // begin marking
        for (let i = 0; i < 5 ; i++) {
            let currentBlock = currentList[i];
            let correctBlock = correctList[i];

            if (currentBlock.id === 0) {
                console.log('end of marking');
                break;
            }
            else if (currentBlock.id === correctBlock.id) {
                console.log('correct');
                totalPoints += linePoint
            } else if (currentBlock.id !== correctBlock.id) {
                console.log('wrong');
                totalPoints -= linePoint
            }
        }

        console.log(totalPoints);
        this.handleOpenFeedback();



    };

    getCurrentCode = (blocks) => {
        this.setState({
            currentCode: blocks,
        })
    };

    handleOpenFeedback = () => {
        this.setState({ feedbackOpen: true });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Typography variant="display1" gutterBottom>
                    {this.props.data.question}
                </Typography>

                <CodeContainer
                    data={this.props.data}
                    getCurrentCode={(blocks) => this.getCurrentCode(blocks)}
                />

                <div className={classes.buttonSection}>
                    <Button onClick={this.handleBack} variant="contained" color="secondary" className={classes.button}> Back </Button>
                    <Button onClick={this.handleCheck} variant="contained" color="primary" className={classes.button}> Check </Button>
                </div>

                <FeedbackModal
                    open={this.state.feedbackOpen}
                />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(withStyles(Style)(Exercise));
