import './InputFieldType2.css';
// import { useState } from 'react';
function InputField(props) {
    return (
        <div className={`form-group ${props.className}`}>
            <label className={props.classLabel}>{props.label}</label>
            {props.prepend && (
                <div className={`input-group-prepend ${props.classInput}`}>
                    <span className='input-group-text'>{props.prepend}</span>
                </div>
            )}
            {props.type === 'textarea' ? (
                <textarea
                    className={`form-control input-type2 ${props.classInput}`}
                    rows='2'
                    defaultValue={props.value}
                    onChange={props.onChange}
                ></textarea>
            ) : (
                <input
                    type={props.type}
                    className={`form-control input-type2 ${props.classInput}`}
                    placeholder={
                        props.ph
                            ? props.ph
                            : props.value
                            ? props.value
                            : 'Not set up yet'
                    }
                    defaultValue={props.value}
                    onChange={props.onChange}
                    pattern={props.pattern}
                    disabled={props.disabled}
                />
            )}
        </div>
    );
}

export default InputField;
