import React from 'react';
import './RectangleSelect2.css';
function CustomRadio(props) {
    return (
        <div className='radio-toolbar'>
            <input
                type='radio'
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

export default CustomRadio;
