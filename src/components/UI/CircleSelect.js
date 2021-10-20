import React from 'react';
import './CircleSelect.css';
function CircleSelect(props) {
    return (
        <div className={`checkbox-toolbar2 ${props.addClass}`}>
            <input
                type={props.type}
                id={props.id}
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
                onClick={props.onClick}
                onSelect={props.onSelect}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

export default CircleSelect;
