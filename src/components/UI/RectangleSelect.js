import React from 'react';
import './RectangleSelect.css';
function CustomCheckbox(props) {
    return (
        <div className='checkbox-toolbar'>
            <input
                type={props.type}
                id={props.id}
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
                onClick={props.onClick}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

export default CustomCheckbox;
