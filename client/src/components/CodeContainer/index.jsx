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
            data: this.props.data, // not used yet
            blocks: this.props.data.startCode,
            indent: [],
        };
    }

    moveBlockVertical(dragVerticalIndex, hoverVerticalIndex, ) {
        const { blocks } = this.state;
        const dragBlock = blocks[dragVerticalIndex];

        this.setState(update(this.state, {
            blocks: {
                $splice: [
                    [dragVerticalIndex, 1],
                    [hoverVerticalIndex, 0, dragBlock]
                ]
            }
        }));
    }

    moveBlockHorizontal(dragHorizontalIndex, hoverHorizontalIndex, ) {
        const { blocks } = this.state;
        // console.log('HELP');

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
                            verticalIndex={i}
                            horizontalIndex={0}
                            listId={this.props.id}
                            block={block}
                            moveBlockVertical={this.moveBlockVertical.bind(this)}
                            moveBlockHorizontal={this.moveBlockHorizontal.bind(this)}
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
