import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import CodeBlock from 'components/CodeBlock';
import { DropTarget } from 'react-dnd';
import update from 'react-addons-update';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class CodeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            blocks: [],
        };
    }

    componentDidMount() {

        this.setState({
            blocks: this.props.data.startCode
        });
    }

    moveBlockVertical = (dragVerticalIndex, hoverVerticalIndex) => {
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

        this.props.getCurrentCode(this.state.blocks);
    };

    moveBlockHorizontal = (verticalIndex, horizontalIndex) => {
        let newBlocks = [ ...this.state.blocks ];
        newBlocks[verticalIndex].indent = horizontalIndex;

        this.setState({
            blocks: newBlocks
        });

        this.props.getCurrentCode(this.state.blocks);
    };

    render() {
        const { blocks } = this.state;
        const { classes, canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const backgroundColor = isActive ? 'lightgreen' : '#FFF';

        let dullIndex;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].id === 0)
                dullIndex = i;
        }

        return connectDropTarget(
            <div className={classes.container} style={{ backgroundColor }}>

                {blocks.map((block, i) => {
                    let isDull = i > dullIndex;
                    return (
                            <CodeBlock
                                key={block.id}
                                verticalIndex={i}
                                horizontalIndex={isDull ? 0 : block.indent}
                                id={block.id}
                                block={block}
                                dull={isDull}
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
