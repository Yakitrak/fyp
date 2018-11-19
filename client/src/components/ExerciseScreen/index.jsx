import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CodeContainer from 'components/CodeContainer';

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CodeContainer data={this.props.data}/>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(withStyles(Style)(Exercise));
