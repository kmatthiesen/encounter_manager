import React from 'react';

export default function PlayerRow(props) {
    return (
        <div style={props.style}>
            {props.player.name} | Initiative: {props.player.initiative}
        </div>
    )
};