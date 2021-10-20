import googleIcon from '../../assets/images/google-logo.png';
import './Button.css';
function Button(props) {
    return (
        <>
            <button
                type='button'
                className={'btn ' + props.variant}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.variant === 'btn-auth-2' && (
                    <img src={googleIcon} alt='Google Icon'></img>
                )}
                {props.label}
            </button>
        </>
    );
}

export default Button;
