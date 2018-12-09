import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CodeContainer from 'components/CodeContainer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    handleBack = () => {
        alert('No Back Yet');

    };

    handleCheck = () => {
        alert('Next Button');





    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Typography variant="display1" gutterBottom>
                    {this.props.data.question}
                </Typography>

                <CodeContainer data={this.props.data}/>

                <div className={classes.buttonSection}>
                    <Button onClick={this.handleBack} variant="contained" color="secondary" className={classes.button}> Back </Button>
                    <Button onClick={this.handleCheck} variant="contained" color="primary" className={classes.button}> Check </Button>
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(withStyles(Style)(Exercise));
