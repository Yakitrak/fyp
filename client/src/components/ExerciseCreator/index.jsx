import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from 'components/ExerciseCreator/style';
import Typography from '@material-ui/core/Typography';

class ExerciseCreator extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography color='inherit' variant='display1' className={classes.aboutText}>
                    Hi. I don't know what to write here for now so I'll write this filler text. Hopefully it will take roughly the same amount of space. If not then I can always edit it.
                </Typography>
            </div>
        );
    }
}

export default withStyles(Style)(ExerciseCreator);
