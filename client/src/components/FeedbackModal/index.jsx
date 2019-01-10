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
        };
    }

    componentDidMount = () => {
      this.createFeedback();
    };

    createFeedback = () => {

        console.log(this.props.feedback);

        this.setState({

        });
    };


    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={true}
                onClose={this.props.handleClose}
                PaperComponent={draggablePaper}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle id="draggable-dialog-title"> Feedback </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send
                        updates occasionally.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                    {/*<Button onClick={this.props.handleClose} color="primary">*/}
                        {/*Other*/}
                    {/*</Button>*/}
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(Style)(Feedback);
