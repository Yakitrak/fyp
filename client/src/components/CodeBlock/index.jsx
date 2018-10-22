import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
    DragSource,
    DropTarget,
    ConnectDragSource,
    ConnectDropTarget,
    DragSourceMonitor,
    DropTargetMonitor,
} from 'react-dnd';


const Types = {
    CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
    canDrag(props) {
        // You can disallow drag based on props
        return props.isReady;
    },

    isDragging(props, monitor) {
        // If your component gets unmounted while dragged
        // (like a card in Kanban board dragged between lists)
        // you can implement something like this to keep its
        // appearance dragged:
        return monitor.getItem().id === props.id;
    },

    beginDrag(props, monitor, component) {
        // Return the data describing the dragged item
        const item = { id: props.id };
        return item;
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            // You can check whether the drop was successful
            // or if the drag ended but nobody handled the drop
            return;
        }

        // When dropped on a compatible target, do something.
        // Read the original dragged item from getItem():
        const item = monitor.getItem();

        // You may also read the drop result from the drop target
        // that handled the drop, if it returned an object from
        // its drop() method.
        const dropResult = monitor.getDropResult();

        // This is a good place to call some Flux action
        CardActions.moveCardToList(item.id, dropResult.listId);
    }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    };
}

class CodeBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { isDragging, connectDragSource } = this.props;
        const { classes } = this.props;

        return connectDragSource(
            <div >
                <ListItem button>
                     <ListItemText primary={this.props.code} />
                </ListItem>
            </div>
        );
    }
}

export default DragSource(Types.CARD, cardSource, collect)(withStyles(Style)(CodeBlock));
