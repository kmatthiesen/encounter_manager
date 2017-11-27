import React from 'react';

const style = {
    div: {
        borderBottom: '1px solid black',
        margin: '5px'
    }
};

export default function PlayerRow(props) {
    return (
        <div style={props.style}>
            {props.player.name} | Initiative: {props.player.initiative}
        </div>
    )
};