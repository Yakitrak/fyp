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

class ExerciseCreator extends React.Component {
    constructor() {
        super();
        this.state = {
            data: this.props.data,
        };
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.data);
        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="Trash" />
                    </ListItem>
                    <ListItem button component="a" href="#simple-list">
                        <ListItemText primary="Spam" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default withStyles(Style)(ExerciseCreator);
