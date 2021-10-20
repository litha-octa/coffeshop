function InputField(props) {
    // console.log(props);
    return (
        <div className='form-group col col-12'>
            <label className={props.classLabel}>{props.label}</label>
            <input
                type={props.type}
                className={`form-control auth ${props.classInput}`}
                placeholder={props.ph}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onMouseLeave={props.onMouseLeave}
                onClick={props.onClick}
                autoComplete={props.autocomplete}
                required={props.required}
                value={props.value}
            />
        </div>
    );
}

export default InputField;
