import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from 'components/ExerciseCreator/style';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { DragSource } from 'react-dnd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class ExerciseCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    createCode = () => {
        let code_stuff = [];
        this.props.data.code.map(line => {
            code_stuff.push(
                <ListItem button>
                    <ListItemText primary={line} />
                </ListItem>
            );
        });

        return code_stuff;
    };

    render() {
        const { classes } = this.props;
        const codeBox = this.createCode();

        return (
            <div className={classes.root}>
                <List>
                    {codeBox}
                </List>
            </div>
        );
    }
}

export default withStyles(Style)(ExerciseCreator);
