import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthContainer from '../components/Auth/AuthContainer';
import InputField from '../components/UI/InputFieldType1';
import Button from '../components/UI/Button';
import NotifAlert from '../components/UI/Notif';

import { postResetPassword, postVerifyOTP } from '../redux/actions/auth';
import { connect } from 'react-redux';
import { persistor } from '../redux/store';
import { useLocation, useHistory } from 'react-router-dom';
function ResetPassword(props) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const history = useHistory()

    const handleSubmit = (event) => {
        if (isValidPassword && isValidNewPassword) {
            setIsDisabled(false);

            const postData = { newPassword };
            props.postResetPassword(
                `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/auth/resetPassword`,
                postData,
                props.auth.results.token
            );
            persistor.purge();
            history.push('/login')
            // event.preventDefault();
        } else {
            passwordValidate();
            newPasswordValidate();
        }
    };
    const query = new URLSearchParams(useLocation().search).get('hO');
    const queryID = new URLSearchParams(useLocation().search).get('id');
    useEffect(() => {
        props.postVerifyOTP(
            `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/auth/verifyOTP`,
            { otp: query, id: queryID }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(props);

    // Form Validation
    const [isValidPassword, setIsValidPassword] = useState();
    const [isValidNewPassword, setIsValidNewPassword] = useState();
    const [isReseted, setIsReseted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [notifAlert, setNotifAlert] = useState({
        type: '',
        title: '',
        content: '',
        alertPop: false,
    });

    const passwordValidate = () => {
        if (password === '') {
            setIsValidPassword(false);
            setIsDisabled(true);

            setNotifAlert({
                type: 'warning',
                title: 'Opppss😖',
                content: 'You must fill in the password',
                alertPop: true,
            });
        } else if (password !== '' && password.length < 8) {
            setIsValidPassword(false);
            setIsDisabled(true);

            setNotifAlert({
                type: 'warning',
                title: 'Oppss..',
                content:
                    'Your password is too short. Must be at least 8 characters',
                alertPop: true,
            });
        } else {
            setIsValidPassword(true);
        }
    };

    const newPasswordValidate = () => {
        if (newPassword === '') {
            setIsValidNewPassword(false);
            setIsDisabled(true);

            setNotifAlert({
                type: 'warning',
                title: 'Oppss..',
                content: 'You must fill in the password',
                alertPop: true,
            });
        } else if (newPassword !== password) {
            setIsValidNewPassword(false);
            setIsDisabled(true);

            setNotifAlert({
                type: 'warning',
                title: 'Oppss..',
                content: "Your password don't match",
                alertPop: true,
            });
        } else {
            setIsValidNewPassword(true);
        }
    };

    const ref = useRef();
    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
        } else {
            if (props.auth.info.message.includes('successfully changed')) {
                setIsReseted(true);
                setNotifAlert({
                    type: 'success',
                    title: 'Success',
                    alertPop: true,
                });
                setPassword('');
                setNewPassword('');
            }
            if (props.auth.isRejected) {
                setIsReseted(true);
                setNotifAlert({
                    type: 'error',
                    title: 'Something wrong happened',
                    content: 'We are so sorry. Please try again later',
                    alertPop: true,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.auth.isFulfilled, props.auth.isRejected, props]);

    useEffect(() => {
        if (password.length > 7 && newPassword.length > 7) {
            setIsDisabled(false);
        } else if (!isValidPassword && !isValidNewPassword) {
            setIsDisabled(true);
        } else {
            setIsDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, newPassword]);

    return (
        <div className='ForgotPassword'>
            {props.auth.isRejected ? (
                <h1>failed</h1>
            ) : props.auth.isPending ? (
                <h1>Loading</h1>
            ) : (
                <AuthContainer>
                    <div className='reset-msg'>
                        <h1>Create your new password</h1>
                        <p>Don't worry, we got your back!</p>
                    </div>

                    <form className='form-auth'>
                        {isReseted === true && notifAlert.alertPop && (
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
                            >
                                Yeay your account is back 😀 You can login{' '}
                                <Link to='/login'>here</Link>{' '}
                            </NotifAlert>
                        )}
                        <InputField
                            type='password'
                            ph='Enter your new password'
                            classLabel='input-label-auth'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={passwordValidate}
                            onClick={() => setIsValidPassword()}
                            required={true}
                            autocomplete='current-password'
                        />
                        {isValidPassword === false && notifAlert.alertPop && (
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
                            />
                        )}

                        <InputField
                            type='password'
                            ph='  Confirm new password'
                            classLabel='input-label-auth'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onBlur={newPasswordValidate}
                            onClick={() => setIsValidNewPassword()}
                            required={true}
                            autocomplete='current-password'
                        />
                        {isValidNewPassword === false && notifAlert.alertPop && (
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
                            />
                        )}
                    </form>
                    <div className='container-fluid d-flex flex-column col-12 text-center'>
                        <Button
                            variant='btn-auth-1'
                            label='Reset my password'
                            onClick={(e) => handleSubmit(e)}
                            disabled={isDisabled}
                        />
                    </div>
                </AuthContainer>
            )}
        </div>
    );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
    postResetPassword: (url, data, token) => {
        dispatch(postResetPassword(url, data, token));
    },
    postVerifyOTP: (url, data) => {
        dispatch(postVerifyOTP(url, data));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
