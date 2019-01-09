import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
        };
    }

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        const { classes } = this.props;

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
            >
                <div >
                    <Typography variant="h6" id="modal-title">
                        Text in a modal
                    </Typography>
                    <Typography variant="subtitle1" id="simple-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </div>
            </Modal>
        );
    }
}

export default withStyles(Style)(Feedback);
