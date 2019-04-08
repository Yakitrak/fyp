import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import CodeBlock from 'Pages/Exercise/CodeBlock/index';
import { DropTarget } from 'react-dnd';
import update from 'react-addons-update';


class CodeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: [],
            wrongBlocks: this.props.wrongBlocks,
        };
    }

    componentDidMount() {
        //set up indent as 0
        let blocks = this.props.data.startCode;
        for (let block of blocks) {
                block['indent'] = 0;
        }
        this.setState({
            blocks: blocks,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            wrongBlocks: nextProps.wrongBlocks,
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

        if (hoverVerticalIndex === 0 ) {
            this.props.tutorialStepsUpdate('vertical');
        }
    };

    moveBlockHorizontal = (verticalIndex, horizontalIndex) => {

        if (horizontalIndex !== this.state.blocks[verticalIndex].indent) {
            this.props.getCurrentCode(this.state.blocks);
            this.props.tutorialStepsUpdate('horizontal');
        }

        let newBlocks = [ ...this.state.blocks ];
        newBlocks[verticalIndex].indent = horizontalIndex;

        this.setState({
            blocks: newBlocks
        });
    };

    render() {
        const { blocks, wrongBlocks } = this.state;
        const { classes, canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const backgroundColor = isActive ? 'lightgreen' : '#FFF';
        let dullIndex;
        let paddingTop;

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].id === 0) dullIndex = i;
            paddingTop = blocks[0].id === 0 ? 40 : 0;
        }

        return connectDropTarget(
            <div className={classes.container} style={{ backgroundColor, paddingTop }}>

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
                                errorIndex={wrongBlocks.indexWrong.includes(block.id)}
                                errorIndent={wrongBlocks.indentWrong.includes(block.id)}
                                resetError={this.props.resetError}
                                tutorialActiveVertical={this.props.tutorialActiveVertical}
                                tutorialActiveHorizontal={this.props.tutorialActiveHorizontal}
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
