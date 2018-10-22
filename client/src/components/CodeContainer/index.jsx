import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from 'components/CodeContainer/style';
import List from '@material-ui/core/List';
import CodeBlock from 'components/CodeBlock';
import { DropTarget, DragDropContext, ConnectDropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


class CodeContainer extends React.Component {
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
                <CodeBlock code={line} />
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

export default withStyles(Style)(CodeContainer);
