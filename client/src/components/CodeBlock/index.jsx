import React from 'react';
import { findDOMNode } from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DragSource, DropTarget } from 'react-dnd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Chip from '@material-ui/core/Chip';
import DragButton from '@material-ui/icons/DragHandle';
import flow from 'lodash/flow';


class CodeBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '',
            backgroundColor: '',
        };
    }

    componentWillMount() {
        this.styleBlocks();
    }

    componentWillReceiveProps() {
        this.styleBlocks();
    }

    styleBlocks() {
        const { block } = this.props;
        let width = '100%';
        let backgroundColor = 'white';

        // determine width
        if (block.indent === 0) {
            width = '100%'
        }
        else if (block.indent === 1) {
            width = 'calc(95%)'
        }
        else if (block.indent === 2) {
            width = 'calc(90%)'
        }
        else if (block.indent === 3) {
            width = 'calc(85%)'
        }

        // colour of slider
        if (block.id === 0) {
            backgroundColor = 'yellow';
        }

        // colour of unused code blocks
        else if (this.props.dull === true) {
            backgroundColor = 'grey';
        }

        this.setState({
            width: width,
            backgroundColor: backgroundColor,
        });
    }

    render() {
        const { classes, block, connectDragSource, isDragging, connectDropTarget, connectDragPreview } = this.props;
        const { width, backgroundColor } = this.state;
        const opacity = isDragging ? 0 : 1;

        return (
            connectDragPreview &&
            connectDragSource &&
            connectDragPreview(connectDropTarget(connectDragSource(
            <div className={classes.block} style={{ opacity, width, backgroundColor }}>
                <ListItem>
                    <ListItemText primary={block.line} />
                    <ListItemSecondaryAction>
                        <Chip label={'Indent: ' + block.indent} />
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        ))));
    }
}

const blockSource = {
    beginDrag(props) {
        return {
            verticalIndex: props.verticalIndex,
            horizontalIndex: props.horizontalIndex,
            block: props.block
        };
    },
};

const blockTarget = {

    drop(props, monitor, component) {

        const dragVerticalIndex = monitor.getItem().verticalIndex;
        let dragHorizontalIndex = monitor.getItem().horizontalIndex;

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the left
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        // indent right two
        // if (hoverClientX > hoverBoundingRect.left + rectSect && dragHorizontalIndex < 2) {
        //     dragHorizontalIndex+=2;
        // }

        // indent right one
        if (hoverClientX > hoverBoundingRect.left && dragHorizontalIndex < 3) {
            dragHorizontalIndex+=1;
        }

        // indent left two
        // else if (hoverClientX < hoverBoundingRect.left - rectSect && dragHorizontalIndex > 1) {
        //     dragHorizontalIndex-=2;
        // }

        // indent left one
        else if (hoverClientX < hoverBoundingRect.left && dragHorizontalIndex > 0) {
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
