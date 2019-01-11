import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function draggablePaper(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackText: '',
            feedbackTitle: '',
        };
    }

    componentDidMount = () => {
      this.createFeedback();
    };

    createFeedback = () => {
        const {feedbackTotal, feedbackList } = this.props;
        let feedbackString = '';

        if (feedbackTotal === 100) {
            feedbackString += 'Perfect, you got everything right! ';
        } else if (feedbackTotal > 50) {
            feedbackString += 'Well done, you are almost there! ';
        } else if (feedbackTotal > 20 ) {
            feedbackString += 'You have some lines right, keep trying! ';
        } else if (feedbackTotal === 0) {
            feedbackString += 'Keep trying! ';
        }

        if (feedbackList.includes('indent')) {
            feedbackString += 'Try fixing some indentations! ';
        }

        if (feedbackList.includes('extra')) {
            feedbackString += 'You have more lines than you need! ';
        }

        if (feedbackList.includes('few')) {
            feedbackString += 'Try adding more lines ';
        }

        console.log(feedbackTotal);

        this.setState({
            feedbackText: feedbackString,
            feedbackTitle: Math.round(feedbackTotal) + '%',
        });

    };


    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={true}
                onClose={this.props.handleClose}
                PaperComponent={draggablePaper}
                aria-labelledby="draggable-dialog-feedback"
            >
                <DialogTitle id="draggable-dialog-feedback"> {this.state.feedbackTitle} </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.state.feedbackText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(Style)(Feedback);
