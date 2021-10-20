function InputField(props) {
    return (
        <div className="dateInputPromo">
            <label className='MenuNewPromo'>{props.label}</label>
            <input
                type={props.type}
                className='form-control.prom'
                placeholder={props.ph}
            />
        </div>
    );
}

export default InputField;