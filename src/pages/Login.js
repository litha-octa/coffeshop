import { React, useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContainer from '../components/Auth/AuthContainer';
import InputField from '../components/UI/InputFieldType1';
import Button from '../components/UI/Button';

import NotifAlert from '../components/UI/Notif';

import { postLogin } from '../redux/actions/auth';
import { connect } from 'react-redux';
function Login(props) {
    const [login, setLogin] = useState({ email: '', password: '' });
    const history = useHistory();

    // state for alert component
    const [alertType, setAlertType] = useState({
        email: '',
        password: '',
    });
    const [alertTitle, setAlertTitle] = useState({
        email: '',
        password: '',
    });
    const [alertContent, setAlertContent] = useState({
        email: '',
        password: '',
    });

    const [alertPop, setAlertPop] = useState({
        email: false,
        password: false,
    });

    // Form Validation
    const isValidEmailAddress = (address) => {
        return !!address.match(/^[^\s@]+@[^\s@.]+\.[^\s@]+$/);
    };

    const [isValidEmail, setIsValidEmail] = useState();
    const [isValidPassword, setIsValidPassword] = useState();
    const [isDisabled, setIsDisabled] = useState(true);

    const emailValidate = () => {
        if (login.email === '') {
            setIsValidEmail(false);
            setIsDisabled(true);

            setAlertType({ ...alertType, email: 'warning' });
            setAlertTitle({ ...alertTitle, email: 'Oppss..' });
            setAlertContent({
                ...alertContent,
                email: 'You must fill in the email 🔪',
            });
            setAlertPop({ ...alertPop, email: true });
        } else if (!isValidEmailAddress(login.email)) {
            setIsValidEmail(false);
            setIsDisabled(true);

            setAlertType({ ...alertType, email: 'warning' });
            setAlertTitle({ ...alertTitle, email: 'Oppss..' });
            setAlertContent({
                ...alertContent,
                email: 'Email format is wrong. Please check again',
            });
            setAlertPop({ ...alertPop, email: true });
        } else {
            setIsValidEmail(true);
        }
    };

    const passwordValidate = () => {
        if (login.password === '') {
            setIsValidPassword(false);
            setIsDisabled(true);
            setAlertType({ ...alertType, password: 'warning' });
            setAlertTitle({ ...alertTitle, password: 'Oppss..' });
            setAlertContent({
                ...alertContent,
                password: 'You must fill in the password',
            });
            setAlertPop({ ...alertPop, password: true });
        } else {
            setIsValidPassword(true);
        }
    };

    const handleSubmit = (event) => {
        if (isValidEmail && isValidPassword) {
            setIsDisabled(false);
            const postData = { email: login.email, password: login.password };
            props.postLogin(
                `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/auth/login`,
                postData
            );

            event.preventDefault();
        } else {
            emailValidate();
            passwordValidate();
        }
    };
    // console.log(isSuccess);
    const ref = useRef();
    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
        } else {
            if (props.auth.isFulfilled) {
                history.push('/');
            }
            if (props.auth.isRejected) {
                if (props.auth.err.message.includes('400')) {
                    // setIsSuccess(false);
                    setAlertType({ ...alertType, success: 'error' });
                    setAlertTitle({
                        ...alertTitle,
                        success: 'Oppss..',
                    });
                    setAlertContent({
                        ...alertContent,
                        success:
                            'Your email or password is wrong. Please try again!',
                    });

                    setAlertPop({ ...alertPop, success: true });
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.auth.isFulfilled, props.auth.isRejected, props]);

    useEffect(() => {
        if (login.email.length > 5 && login.password.length > 7) {
            setIsDisabled(false);
        } else if (!isValidEmail && !isValidPassword) {
            setIsDisabled(true);
        } else {
            setIsDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login]);
    return (
        <>
            <AuthContainer menu='Login'>
                {alertPop.success && (
                    <NotifAlert
                        variant={alertType.success}
                        onClose={() =>
                            setAlertPop({ ...alertPop, success: false })
                        }
                        title={alertTitle.success}
                        content={alertContent.success}
                    ></NotifAlert>
                )}
                <form className='form-auth'>
                    <InputField
                        label='Email Address :'
                        type='email'
                        ph='Enter your email address'
                        classLabel='input-label-auth'
                        value={login.email}
                        onChange={(e) =>
                            setLogin({ ...login, email: e.target.value })
                        }
                        autocomplete='username'
                        onBlur={emailValidate}
                        onClick={() => setIsValidEmail()}
                        required={true}
                    />
                    {isValidEmail === false && alertPop.email && (
                        <NotifAlert
                            variant={alertType.email}
                            onClose={() =>
                                setAlertPop({ ...alertPop, email: false })
                            }
                            title={alertTitle.email}
                            content={alertContent.email}
                        />
                    )}
                    <InputField
                        label='Password :'
                        type='password'
                        ph='Enter your password'
                        classLabel='input-label-auth'
                        value={login.password}
                        onChange={(e) =>
                            setLogin({ ...login, password: e.target.value })
                        }
                        onBlur={passwordValidate}
                        onClick={() => setIsValidPassword()}
                        required={true}
                        autocomplete='current-password'
                    />
                    {isValidPassword === false && alertPop.password && (
                        <NotifAlert
                            variant={alertType.password}
                            onClose={() =>
                                setAlertPop({ ...alertPop, password: false })
                            }
                            title={alertTitle.password}
                            content={alertContent.password}
                        />
                    )}
                </form>
                <Link to='/forgot-password'>
                    <div className='forgotPass'>Forgot password?</div>
                </Link>
                <div className='container-fluid d-flex flex-column col-12 text-center'>
                    <Button
                        variant='btn-auth-1'
                        label='Login'
                        onClick={(e) => handleSubmit(e)}
                        disabled={isDisabled}
                    />
                    <Button
                        variant='btn-auth-2'
                        label='Login with Google'
                        disabled={true}
                    />

                    <span className='hr-section'>Don’t have an account?</span>

                    <Button
                        variant='btn-auth-3'
                        label='Sign up here'
                        onClick={() => history.push('/register')}
                    />
                </div>
            </AuthContainer>
        </>
    );
}
const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
    postLogin: (url, data) => {
        dispatch(postLogin(url, data));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
