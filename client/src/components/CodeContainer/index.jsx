import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import List from '@material-ui/core/List';
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

    pushBlock(block) {
        this.setState(update(this.state, {
            blocks: {
                $push: [ block ]
            }
        }));
    }

    removeBlock(index) {
        this.setState(update(this.state, {
            blocks: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
    }

    moveBlock(dragIndex, hoverIndex) {
        const { blocks } = this.state;
        const dragCard = blocks[dragIndex];

        this.setState(update(this.state, {
            blocks: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
    }

    createCodeBlocks = () => {
        let blockList = [];
        this.props.data.code.map((line, index) => {
            blockList.push(
                <CodeBlock
                    key={index}
                    index={index}
                    listId={1}
                    block={line}
                    code={line}
                    removeBlock={this.removeBlock.bind(this)}
                    moveBlock={this.moveBlock.bind(this)}
                />
            );
        });
        return blockList;
    };

    render() {
        const { blocks } = this.state;
        const { classes } = this.props;
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const style = {
            width: "200px",
            height: "404px",
            border: '1px dashed gray'
        };
        const backgroundColor = isActive ? 'lightgreen' : '#FFF';
        const codeBox = this.createCodeBlocks();

        return connectDropTarget(
            <div style={{...style, backgroundColor}}>
                {blocks.map((block, i) => {
                    return (
                        <CodeBlock
                            key={block.id}
                            index={i}
                            listId={this.props.id}
                            block={block}
                            removeBlock={this.removeBlock.bind(this)}
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
        const { id } = props;
        const sourceObj = monitor.getItem();
        if ( id !== sourceObj.listId ) component.pushBlock(sourceObj.block);
        return {
            listId: id
        };
    }
};

export default DropTarget("BLOCK", blockTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))((withStyles(Style)(CodeContainer)));
