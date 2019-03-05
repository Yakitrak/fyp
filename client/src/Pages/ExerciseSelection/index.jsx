import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Topbar from 'components/TopBar';

class ExerciseSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    createQuestionsSection = () => {

        // call finished questions

        // call active questions

    };


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Topbar />
                Hello Exercise Selection Screen
            </div>
        );
    }
}

export default withStyles(Style)(ExerciseSelection);
