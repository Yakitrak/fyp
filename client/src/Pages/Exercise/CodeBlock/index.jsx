import React from 'react';
import { findDOMNode } from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestLight as codeStyle } from 'react-syntax-highlighter/dist/styles/hljs';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import LeftIcon from 'mdi-react/ArrowLeftDropCircleIcon';
import RightIcon from 'mdi-react/ArrowRightDropCircleIcon';

class CodeBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes, block, dull, horizontalIndex, verticalIndex, errorIndex, errorIndent, connectDragSource, isDragging, connectDropTarget, connectDragPreview } = this.props;
        const opacity = isDragging ? 0 : 1;
        let width = !dull ? 'calc(100% - ' + 3*40 + 'px )' : '100%';
        let marginLeft = !dull ? horizontalIndex * 40 : 0;

        let backgroundColor = 'white';
        let border = '1px dashed grey';

        // colour of unused code blocks
        if (dull) {
            backgroundColor = 'rgba(0, 0, 0, 0.20)';
        }
        // colour of used blocks + error styling
        else  {
            backgroundColor = 'rgb(241, 239 , 238)';
            if (errorIndent) {
                border = '2px solid orange';
            }
            if (errorIndex) {
                border = '2px solid red';
            }
        }
        const sliderStyle = block.id === 0 ? {
            background: 'black',
            cursor: 'default',
            width: 'default',
            margin: 'default',
            marginLeft: 1,
            borderRadius: 0,
            border: '0px',
        } : {};

        return (
            connectDragPreview &&
            connectDragSource &&
            connectDragPreview(connectDropTarget(connectDragSource(
            <div className={classes.block} style={{ overflowY: 'hidden', border, opacity, width, backgroundColor, marginLeft, ...sliderStyle}}>
                <ListItem classes={{
                    root: classes.listRoot,
                }} >
                    <ListItemText classes={{
                        primary: block.id === 0 ? classes.primaryClass : ''
                    }}
                        primary={
                        (this.props.dull || block.id === 0 ) ?
                            (<pre>{block.line}</pre>) :
                            (<SyntaxHighlighter showLineNumbers={false} startingLineNumber={this.props.verticalIndex} language='python' style={codeStyle}>{block.line}</SyntaxHighlighter>)}
                        />
                    {(this.props.dull || block.id === 0 ) ?
                    '' :
                    (  <ListItemSecondaryAction> 
                    <IconButton disabled={horizontalIndex === 0} aria-label="Indent Left" onClick={() => this.props.moveBlockHorizontal(verticalIndex, horizontalIndex - 1)} >
                        <LeftIcon/>
                    </IconButton>
                    <IconButton disabled={horizontalIndex === 3}  aria-label="Indent Right" onClick={() => this.props.moveBlockHorizontal(verticalIndex, horizontalIndex + 1)}>
                        <RightIcon />
                    </IconButton>
                </ListItemSecondaryAction>)}
                </ListItem>

            </div>
        ))));
    }
}

const blockSource = {
    beginDrag(props, monitor) {

        props.resetError();

        return {
            verticalIndex: props.verticalIndex,
            horizontalIndex: props.horizontalIndex,
            block: props.block,
        };
    },
    canDrag(props, monitor) {
      return props.block.id !== 0;
    },
};

const blockTarget = {

    drop(props, monitor, component) {

        const dragVerticalIndex = monitor.getItem().verticalIndex;
        let dragHorizontalIndex = monitor.getItem().horizontalIndex;

        // Determine mouse position
        const endPos = monitor.getClientOffset();
        const startPos = monitor.getInitialClientOffset();

        // Don't indent if trying to move vertically
        const allow = (Math.abs(startPos.y - endPos.y) < 50);

        // indent right one
        if (endPos.x > startPos.x && dragHorizontalIndex < 3 && allow) {
            dragHorizontalIndex+=1;
        }

        // indent left one
        else if (endPos.x < startPos.x && dragHorizontalIndex > 0 && allow) {
            dragHorizontalIndex-=1;
        }

        monitor.getItem().horizontalIndex = dragHorizontalIndex;
        props.moveBlockHorizontal(dragVerticalIndex, dragHorizontalIndex);
    },

    hover(props, monitor, component) {

        const dragVerticalIndex = monitor.getItem().verticalIndex;
        const hoverVerticalIndex = props.verticalIndex;

        // Don't replace items with themselves
        if (dragVerticalIndex === hoverVerticalIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragVerticalIndex < hoverVerticalIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragVerticalIndex > hoverVerticalIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        monitor.getItem().verticalIndex = hoverVerticalIndex;
        props.moveBlockVertical(dragVerticalIndex, hoverVerticalIndex);

    }
};

export default flow(
    DropTarget("BLOCK", blockTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource("BLOCK", blockSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    })),
)(withStyles(Style)(CodeBlock));
