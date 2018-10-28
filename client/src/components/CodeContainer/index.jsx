import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import CodeBlock from 'components/CodeBlock';
import { DropTarget } from 'react-dnd';
import update from 'react-addons-update';

class CodeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: this.props.list,
            data: this.props.data,
        };
    }

    moveBlock(dragIndex, hoverIndex) {
        const { blocks } = this.state;
        const dragBlock = blocks[dragIndex];

        this.setState(update(this.state, {
            blocks: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragBlock]
                ]
            }
        }));
    }

    render() {
        const { blocks } = this.state;
        const { classes, canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const backgroundColor = isActive ? 'lightgreen' : '#FFF';

        return connectDropTarget(
            <div className={classes.container} style={{ backgroundColor }}>
                {blocks.map((block, i) => {
                    return (
                        <CodeBlock
                            key={block.id}
                            index={i}
                            listId={this.props.id}
                            block={block}
                            moveBlock={this.moveBlock.bind(this)}
                        />
                    );
                })}
            </div>
        );
    }
}

const blockTarget = {
    drop(props, monitor, component ) {
        return;
    }
};

export default DropTarget("BLOCK", blockTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))((withStyles(Style)(CodeContainer)));
