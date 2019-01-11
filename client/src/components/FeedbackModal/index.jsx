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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
            feedbackTips: [],
        };
    }

    componentDidMount = () => {
      this.createFeedback();
    };

    createFeedback = () => {
        const {feedbackTotal, feedbackList } = this.props;
        let feedbackString = '';
        let feedbackTips = [];

        if (feedbackTotal === 100) {
            feedbackString += 'Perfect, you got everything right! ';
        } else if (feedbackTotal > 50) {
            feedbackString += 'Well done, you are almost there! This may help: ';
        } else if (feedbackTotal > 20 ) {
            feedbackString += 'You have some lines right, keep trying! This may help: ';
        } else if (feedbackTotal === 0) {
            feedbackString += 'Unlucky, keep going! This may help: ';
        }



        if (feedbackList.includes('indent')) {
            feedbackTips.push(<ListItem > <ListItemText primary="Try fixing some indentations" /> </ListItem>)
        }

        if (feedbackList.includes('extra')) {
            feedbackTips.push(<ListItem > <ListItemText primary="You have more lines than you need" /> </ListItem>)

        }

        if (feedbackList.includes('few')) {
            feedbackTips.push(<ListItem > <ListItemText primary="Try adding more lines" /> </ListItem>)
        }

        if (feedbackList.includes('arrange')) {
            feedbackTips.push(<ListItem > <ListItemText primary="Blocks are in the wrong place" /> </ListItem>)
        }

        this.setState({
            feedbackText: feedbackString,
            feedbackTitle: Math.round(feedbackTotal) + '%',
            feedbackTips: feedbackTips,
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
                <DialogTitle className={classes.title} id="draggable-dialog-feedback">
                    <Typography variant="h4">
                        {this.state.feedbackTitle}
                    </Typography>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        <Typography variant="subtitle1" gutterBottom>
                            {this.state.feedbackText}
                        </Typography>
                        <List> {this.state.feedbackTips} </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(Style)(Feedback);
