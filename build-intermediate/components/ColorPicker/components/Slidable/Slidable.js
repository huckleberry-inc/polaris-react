import React from 'react';
import { isServer } from '../../../../utilities/target';
import { EventListener } from '../../../EventListener';
import styles from '../../ColorPicker.scss';
let isDragging = false;
// Required to solve a bug causing the underlying page/container to scroll
// while trying to drag the ColorPicker controls.
// This must be called as soon as possible to properly prevent the event.
// `passive: false` must also be set, as it seems webkit has changed the "default" behaviour
// https://bugs.webkit.org/show_bug.cgi?id=182521
if (!isServer) {
    window.addEventListener('touchmove', (event) => {
        if (!isDragging) {
            return;
        }
        event.preventDefault();
    }, { passive: false });
}
export class Slidable extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            dragging: false,
        };
        this.node = null;
        this.draggerNode = null;
        this.setDraggerNode = (node) => {
            this.draggerNode = node;
        };
        this.setNode = (node) => {
            this.node = node;
        };
        this.startDrag = (event) => {
            if (isMouseDownEvent(event)) {
                this.handleDraggerMove(event.clientX, event.clientY);
            }
            isDragging = true;
            this.setState({ dragging: true });
        };
        this.handleDragEnd = () => {
            isDragging = false;
            this.setState({ dragging: false });
        };
        this.handleMove = (event) => {
            event.stopImmediatePropagation();
            event.stopPropagation();
            if (event.cancelable) {
                event.preventDefault();
            }
            if (isMouseMoveEvent(event)) {
                this.handleDraggerMove(event.clientX, event.clientY);
                return;
            }
            this.handleDraggerMove(event.touches[0].clientX, event.touches[0].clientY);
        };
        this.handleDraggerMove = (x, y) => {
            if (this.node == null) {
                return;
            }
            const { onChange } = this.props;
            const rect = this.node.getBoundingClientRect();
            const offsetX = x - rect.left;
            const offsetY = y - rect.top;
            onChange({ x: offsetX, y: offsetY });
        };
    }
    componentDidMount() {
        const { onDraggerHeight } = this.props;
        if (onDraggerHeight == null) {
            return;
        }
        const { draggerNode } = this;
        if (draggerNode == null) {
            return;
        }
        onDraggerHeight(draggerNode.clientWidth);
        if (process.env.NODE_ENV === 'development') {
            setTimeout(() => {
                onDraggerHeight(draggerNode.clientWidth);
            }, 0);
        }
    }
    render() {
        const { dragging } = this.state;
        const { draggerX = 0, draggerY = 0 } = this.props;
        const draggerPositioning = {
            transform: `translate3d(${draggerX}px, ${draggerY}px, 0)`,
        };
        const moveListener = dragging ? (<EventListener event="mousemove" handler={this.handleMove} passive={false}/>) : null;
        const touchMoveListener = dragging ? (<EventListener event="touchmove" handler={this.handleMove} passive={false}/>) : null;
        const endDragListener = dragging ? (<EventListener event="mouseup" handler={this.handleDragEnd}/>) : null;
        const touchEndListener = dragging ? (<EventListener event="touchend" handler={this.handleDragEnd}/>) : null;
        const touchCancelListener = dragging ? (<EventListener event="touchcancel" handler={this.handleDragEnd}/>) : null;
        return (<div ref={this.setNode} className={styles.Slidable} onMouseDown={this.startDrag} onTouchStart={this.startDrag}>
        {endDragListener}
        {moveListener}
        {touchMoveListener}
        {touchEndListener}
        {touchCancelListener}
        <div style={draggerPositioning} className={styles.Dragger} ref={this.setDraggerNode}/>
      </div>);
    }
}
function isMouseMoveEvent(event) {
    return event.type === 'mousemove';
}
function isMouseDownEvent(event) {
    return event.type === 'mousedown';
}