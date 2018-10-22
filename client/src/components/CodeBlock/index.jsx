import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from 'components/CodeContainer/style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DropTarget, DragDropContext, ConnectDropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


class CodeBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div >
                <ListItem button>
                    <ListItemText primary={this.props.code} />
                </ListItem>
            </div>
        );
    }
}

export default withStyles(Style)(CodeBlock);
