import { useState, useEffect, useRef } from 'react';
import AuthContainer from '../components/Auth/AuthContainer';
import InputField from '../components/UI/InputFieldType1';
import Button from '../components/UI/Button';
import NotifAlert from '../components/UI/Notif';
import { connect } from 'react-redux';
import { postSendOTP } from '../redux/actions/auth';

const RESET_INTERVAL_S = 120;

const formatTime = (time) =>
    `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(
        time % 60
    ).padStart(2, '0')}`;

const Timer = ({ time }) => {
    const timeRemain = RESET_INTERVAL_S - (time % RESET_INTERVAL_S);

    return (
        <>
            {time < RESET_INTERVAL_S && (
                <div className='timer'>{formatTime(timeRemain)}</div>
            )}
        </>
    );
};

function ForgotPassword(props) {
    const [time, setTime] = useState();
    const [displayTimer, setDisplayTimer] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState('');

    // TIMER SECTION
    // eslint-disable-next-line
    useEffect(() => {
        const timerId = setInterval(() => {
            setTime((t) => t + 1);
        }, 1000);
        time > RESET_INTERVAL_S && setTime();
        time > RESET_INTERVAL_S && setIsResendDisabled(false);
        return () => clearInterval(timerId);
    });

    // FORM VALIDATION
    const [isValidEmail, setIsValidEmail] = useState();
    const [notifAlert, setNotifAlert] = useState({
        type: '',
        title: '',
        content: '',
        alertPop: false,
    });
    const [isSendDisabled, setIsSendDisabled] = useState(true);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const isValidEmailAddress = (address) => {
        return !!address.match(/^[^\s@]+@[^\s@.]+\.[^\s@]+$/);
    };

    const emailValidate = () => {
        if (confirmEmail === '') {
            setIsValidEmail(false);
            setIsSendDisabled(true);
            setNotifAlert({
                type: 'warning',
                title: 'Oppss..',
                content: 'You must fill in the email',
                alertPop: true,
            });
        } else if (!isValidEmailAddress(confirmEmail)) {
            setIsValidEmail(false);
            setIsSendDisabled(true);

            setNotifAlert({
                type: 'warning',
                title: 'Oppss..',
                content: 'Email format is wrong. Please check again',
                alertPop: true,
            });
        } else {
            setIsValidEmail(true);
        }
    };

    const handleSubmit = (e) => {
        if (isValidEmail) {
            if (confirmEmail) {
                const postData = { email: confirmEmail };
                props.postSendOTP(
                    `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/auth/sendOTP`,
                    postData
                );
                e.preventDefault();
            }
        } else {
            emailValidate();
        }
    };

    const resendHanlder = (e) => {
        (!time || time > RESET_INTERVAL_S) && setTime(0);
        setIsResendDisabled(true);
        handleSubmit(e);
        // e.preventDefault();
    };

    // console.log(isSuccess);
    const ref = useRef();
    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
        } else {
            if (props.auth.isFulfilled) {
                setIsValidEmail(true);
                setIsSendDisabled(true);
                setNotifAlert({
                    type: 'success',
                    title: 'Success',
                    content: 'Check your email. We sent you a magic link 😎',
                    alertPop: true,
                });

                !displayTimer && setTime(0);
                setDisplayTimer(true);
            } else if (props.auth.isRejected) {
                if (props.auth.err.message.includes('403')) {
                    setIsValidEmail(false);
                    setNotifAlert({
                        type: 'error',
                        title: 'Wrong Email 😵',
                        content: 'This email is not registered',
                        alertPop: true,
                    });
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.auth.isFulfilled, props.auth.isRejected, props]);

    useEffect(() => {
        if (confirmEmail.length > 5) {
            setIsSendDisabled(false);
        } else if (!isValidEmail) {
            setIsSendDisabled(true);
        } else {
            setIsSendDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmEmail]);
    return (
        <div className='ForgotPassword'>
            <AuthContainer>
                <div className='reset-msg'>
                    <h1>Forgot your password?</h1>
                    <p>Don't worry, we got your back!</p>
                </div>
                {(isValidEmail === false || isValidEmail) &&
                    notifAlert.alertPop && (
                        <NotifAlert
                            variant={notifAlert.type}
                            onClose={() =>
                                setNotifAlert({
                                    ...notifAlert,
                                    alertPop: false,
                                })
                            }
                            title={notifAlert.title}
                            content={notifAlert.content}
                            addClass='forgot-pass-alert'
                        />
                    )}
                <form className='form-auth'>
                    <InputField
                        type='email'
                        ph='Enter your email address to get link'
                        classLabel='input-label-auth'
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        onBlur={emailValidate}
                        onClick={() => setIsValidEmail()}
                        required={true}
                        autocomplete='email'
                    />
                </form>
                <div className='container-fluid d-flex flex-column col-12 text-center'>
                    <Button
                        variant='btn-auth-1'
                        label='Send'
                        onClick={(e) => handleSubmit(e)}
                        disabled={isSendDisabled}
                    />
                    {displayTimer && (
                        <span className='msg'>
                            Click here if you didn't receive any link in 2
                            minutes
                            <Timer time={time} />
                        </span>
                    )}
                    <Button
                        variant='btn-auth-3'
                        label='Resend Link'
                        onClick={resendHanlder}
                        disabled={isResendDisabled}
                    />
                </div>
            </AuthContainer>
        </div>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
    postSendOTP: (url, data) => {
        dispatch(postSendOTP(url, data));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
