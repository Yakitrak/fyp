import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import List from '@material-ui/core/List';
import CodeBlock from 'components/CodeBlock';


class CodeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: props.list,
            data: this.props.data,
        };
    }

    pushCard(card) {
        this.setState(update(this.state, {
            cards: {
                $push: [ card ]
            }
        }));
    }

    removeCard(index) {
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
    }

    moveCard(dragIndex, hoverIndex) {
        const { cards } = this.state;
        const dragCard = cards[dragIndex];

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
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
        const { cards } = this.state;
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const style = {
            width: "200px",
            height: "404px",
            border: '1px dashed gray'
        };

        const backgroundColor = isActive ? 'lightgreen' : '#FFF';
        const { classes } = this.props;
        const codeBox = this.createCode();

        return connectDropTarget(
            <div style={{...style, backgroundColor}}>
                <List>
                    {codeBox}
                </List>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(withStyles(Style)(CodeContainer));
