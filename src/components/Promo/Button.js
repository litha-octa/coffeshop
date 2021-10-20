function Button(props) {
    return (
        <>
            <button type='button' className={'btn ' + props.variant}>
                {props.label}
            </button>
        </>
    );
}

export default Button;
