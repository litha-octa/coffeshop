import { React, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContainer from '../components/Auth/AuthContainer';
import InputField from '../components/UI/InputFieldType1';
import Button from '../components/UI/Button';
import NotifAlert from '../components/UI/Notif';
import { connect } from 'react-redux';
import { postRegister } from '../redux/actions/auth';
function Register(props) {
    const history = useHistory();
    const [register, setRegister] = useState({
        email: '',
        password: '',
        phone_number: '',
    });

    // state for alert component
    const [alertType, setAlertType] = useState({
        email: '',
        password: '',
        phone: '',
        success: '',
    });
    const [alertTitle, setAlertTitle] = useState({
        email: '',
        password: '',
        phone: '',
        success: '',
    });
    const [alertContent, setAlertContent] = useState({
        email: '',
        password: '',
        phone: '',
        success: '',
    });

    const [alertPop, setAlertPop] = useState({
        email: false,
        password: false,
        phone: false,
        success: false,
    });

    // Form Validation
    const isValidEmailAddress = (address) => {
        return !!address.match(/^[^\s@]+@[^\s@.]+\.[^\s@]+$/);
    };
    const isValidPhoneNumber = (phone) => {
        return !!phone.match(/^[0-9]*$/);
    };

    const [isValidEmail, setIsValidEmail] = useState();
    const [isValidPassword, setIsValidPassword] = useState();
    const [isValidPhone, setIsValidPhone] = useState();
    const [isDisabled, setIsDisabled] = useState(true);
    // const [isSuccess, setIsSuccess] = useState();

    console.log(isValidEmail, isValidPassword, isValidPhone);

    const emailValidate = () => {
        if (register.email === '') {
            setIsValidEmail(false);
            setIsDisabled(true);
            setAlertType({ ...alertType, email: 'warning' });
            setAlertTitle({ ...alertTitle, email: 'Ooppss 😖' });
            setAlertContent({
                ...alertContent,
                email: 'You must fill in the email 🔪',
            });
            setAlertPop({ ...alertPop, email: true });
        } else if (!isValidEmailAddress(register.email)) {
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
        if (register.password === '') {
            setIsValidPassword(false);
            setIsDisabled(true);

            setAlertType({ ...alertType, password: 'warning' });
            setAlertTitle({ ...alertTitle, password: 'Oppss..' });
            setAlertContent({
                ...alertContent,
                password: 'You must fill in the password',
            });
            setAlertPop({ ...alertPop, password: true });
        } else if (register.password !== '' && register.password.length < 8) {
            setIsValidPassword(false);
            setIsDisabled(true);

            setAlertType({ ...alertType, password: 'warning' });
            setAlertTitle({
                ...alertTitle,
                password: 'Oppss..',
            });
            setAlertContent({
                ...alertContent,
                password:
                    'Your password is too short. Must be at least 8 characters ',
            });
            setAlertPop({ ...alertPop, password: true });
        } else {
            setIsValidPassword(true);
        }
    };
    const phoneValidate = () => {
        if (register.phone_number === '') {
            setIsValidPhone(false);
            setIsDisabled(true);

            setAlertType({ ...alertType, phone: 'warning' });
            setAlertTitle({ ...alertTitle, phone: 'Opps..' });
            setAlertContent({
                ...alertContent,
                phone: 'You must fill in the phone number',
            });
            setAlertPop({ ...alertPop, phone: true });
        } else if (
            (register.phone_number !== '' &&
                register.phone_number.length < 11) ||
            register.phone_number.length > 13
        ) {
            setIsValidPhone(false);
            setIsDisabled(true);

            setAlertType({ ...alertType, phone: 'warning' });
            setAlertTitle({
                ...alertTitle,
                phone: 'Oppss..',
            });
            setAlertContent({
                ...alertContent,
                phone: 'Must be at least 11 characters and a maximum of 15 ',
            });
            setAlertPop({ ...alertPop, phone: true });
        } else {
            setIsValidPhone(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidEmail && isValidPassword && isValidPhone) {
            setIsDisabled(false);
            const postData = {
                email: register.email,
                password: register.password,
                phone_number: register.phone_number,
            };
            props.postRegister(
                `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/auth/register`,
                postData
            );
        } else {
            emailValidate();
            passwordValidate();
            phoneValidate();
        }
    };

    // console.log(isSuccess);
    const ref = useRef();
    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
        } else {
            if (props.auth.isFulfilled) {
                // setIsSuccess(true);
                setAlertType({ ...alertType, success: 'success' });
                setAlertTitle({
                    ...alertTitle,
                    success: 'Register Success',
                });
                setAlertContent({
                    ...alertContent,
                    success:
                        'Click the button below to login and enjoy your day at Griffins Coffee ☕',
                });

                setAlertPop({ ...alertPop, success: true });
                setRegister({ email: '', password: '', phone_number: '' });
            }
            if (props.auth.isRejected) {
                if (props.auth.err.message.includes('400')) {
                    // setIsSuccess(false);
                    setAlertType({ ...alertType, success: 'error' });
                    setAlertTitle({
                        ...alertTitle,
                        success: 'Email is already registered',
                    });
                    setAlertContent({
                        ...alertContent,
                        success: 'Sorry 😢 Please use another email',
                    });

                    setAlertPop({ ...alertPop, success: true });
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.auth.isFulfilled, props.auth.isRejected, props]);

    useEffect(() => {
        if (
            register.email.length > 5 &&
            register.password.length > 7 &&
            register.phone_number.length > 10
        ) {
            setIsDisabled(false);
        } else if (!isValidEmail && !isValidPhone && !isValidPassword) {
            setIsDisabled(true);
        } else {
            setIsDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register]);
    // console.log(isDisabled);
    return (
        <>
            <AuthContainer menu='Sign Up'>
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
                        ph='Enter your email address.'
                        classLabel='input-label-auth'
                        value={register.email}
                        onChange={(e) =>
                            setRegister({ ...register, email: e.target.value })
                        }
                        onBlur={emailValidate}
                        onClick={() => setIsValidEmail()}
                        required={true}
                        autocomplete='email'
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
                        value={register.password}
                        onChange={(e) =>
                            setRegister({
                                ...register,
                                password: e.target.value,
                            })
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
                    <InputField
                        label='Phone Number : '
                        type='text'
                        ph='Enter your phone number'
                        classLabel='input-label-auth'
                        value={register.phone_number}
                        onChange={(e) =>
                            isValidPhoneNumber(e.target.value) &&
                            setRegister({
                                ...register,
                                phone_number: e.target.value,
                            })
                        }
                        required={true}
                        onBlur={phoneValidate}
                        onClick={() => setIsValidPhone()}
                    />
                    {isValidPhone === false && alertPop.phone && (
                        <NotifAlert
                            variant={alertType.phone}
                            onClose={() =>
                                setAlertPop({ ...alertPop, phone: false })
                            }
                            title={alertTitle.phone}
                            content={alertContent.phone}
                        />
                    )}
                </form>
                <div className='container-fluid d-flex flex-column col-12 text-center'>
                    <Button
                        variant='btn-auth-1'
                        label='Sign Up'
                        disabled={isDisabled}
                        onClick={(e) => handleSubmit(e)}
                    />
                    <Button
                        variant='btn-auth-2'
                        label='Sign up with Google'
                        disabled={true}
                    />

                    <span className='hr-section'>Already have account?</span>

                    <Button
                        variant='btn-auth-3'
                        label='Login Here'
                        onClick={() => history.push('/login')}
                    />
                </div>
            </AuthContainer>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
    postRegister: (url, data) => {
        dispatch(postRegister(url, data));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
