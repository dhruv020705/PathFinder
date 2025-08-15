import React, { Component } from 'react';
import './Node.css';

export default class Node extends Component {
    render() {
        const {
            col,
            dest,
            src,
            wall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
        } = this.props;

        const css_style = dest ? 'node-dest' : src ? 'node-src' : wall ? 'node-wall' : '';

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${css_style}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}>
            </div>
        );
    }
}

