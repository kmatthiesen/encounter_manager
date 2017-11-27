import React from 'react';

export default function HpDisplay(props) {
    return (
        <span> HP: {props.hp} / {props.maxHp} </span>
    )
}