import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => {
      // this.getStats();
    };

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                       User Skill Statistics
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        [name]
                    </Typography>

                   Stats Text
                </CardContent>

            </Card>
        );
    }
}

export default withStyles(Style)(Statistics);
