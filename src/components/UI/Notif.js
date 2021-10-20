import React from 'react';
import successIcon from '../../assets/images/checked.png';
import errorIcon from '../../assets/images/cancel.png';
import warningIcon from '../../assets/images/warning.png';
import closeIcon from '../../assets/images/close.png';
import './Notif.css';
function Notif(props) {
    return (
        <div className='d-block'>
            <div
                className={`notif-card-message card container-fluid ${props.variant} ${props.addClass}`}
            >
                <div className='notif-card-left col'>
                    <img
                        src={
                            props.variant === 'success'
                                ? successIcon
                                : props.variant === 'error'
                                ? errorIcon
                                : props.variant === 'warning'
                                ? warningIcon
                                : null
                        }
                        alt='success'
                    />
                </div>
                <div className='notif-card-main col col-9'>
                    <div className={`notif-card-title ${props.variant}`}>
                        {props.title}
                    </div>
                    {props.children || props.content}
                </div>
                <div className='notif-card-right col'>
                    <img src={closeIcon} alt='close' onClick={props.onClose} />
                </div>
                <span
                    className={`line-bottom-notif-card ${props.variant}`}
                ></span>
            </div>
        </div>
    );
}

export default Notif;
