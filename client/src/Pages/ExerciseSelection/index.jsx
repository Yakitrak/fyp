import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { theme } from 'theme';

class ExerciseSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                Hello Exercise Selection Screen
            </div>
        );
    }
}

export default withStyles(Style)(ExerciseSelection);
