import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Profile.css';
import Button from '../UI/Button';
import Avatar from './../../assets/images/blank-ava.jpg';
import { postLogout } from '../../redux/actions/auth';
import { updateUser } from '../../redux/actions/user';
import { connect } from 'react-redux';
import { persistor } from '../../redux/store';
import Modal from '../UI/Modal';
import NotifAlert from '../../components/UI/Notif';
function CardContainer(props) {
    const updatedDataUser = props.onUpdated;

    const [modalShow, setModalShow] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalConfirm, setModalConfirm] = useState({ function: '' });

    const [avatar, setAvatar] = useState(updatedDataUser.picture);
    const history = useHistory();

    const updateProfileHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        updatedDataUser.email &&
            formData.append('email', updatedDataUser.email);
        updatedDataUser.phone &&
            formData.append('phone_number', updatedDataUser.phone);
        updatedDataUser.address &&
            formData.append('delivery_address', updatedDataUser.address);
        updatedDataUser.username &&
            formData.append('username', updatedDataUser.username);
        updatedDataUser.birthdate &&
            formData.append('birth_date', updatedDataUser.birthdate);
        updatedDataUser.firstname &&
            formData.append('first_name', updatedDataUser.firstname);
        updatedDataUser.lastname &&
            formData.append('last_name', updatedDataUser.lastname);
        updatedDataUser.gender &&
            formData.append('gender', updatedDataUser.gender);
        props.updateUser(
            `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/users`,
            props.token,
            formData
        );
        // history.push('/home');
        setModalShow(false);
    };

    const uploadImage = useRef(null);

    const uploadImageHandler = (e) => {
        uploadImage.current.click();
        let formData = new FormData();
        formData.append('image', e.target.files[0]);

        setModalShow(true);
        setModalMessage('Are you sure you want to save these changes');
        setModalConfirm({
            function: () => {
                props.updateUser(
                    `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/users`,
                    props.token,
                    formData
                );
                setModalShow(false);
            },
        });
        // history.go(0);
    };

    const removePhotoHandler = (e) => {
        let formData = new FormData();
        formData.append('picture', '');
        props.updateUser(
            `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/users`,
            props.token,
            formData
        );
        setModalShow(false);
    };

    const ref = useRef();

    const [isUpdated, setIsUpdated] = useState(false);
    const [notifAlert, setNotifAlert] = useState({
        type: '',
        title: '',
        content: '',
        alertPop: false,
    });

    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
        } else {
            if (props.user.isUpdated) {
                if (props.user.updated) {
                    props.user.updated.picture !== '' &&
                        setAvatar(props.user.updated.picture);
                    props.user.updated.picture === '' && history.go(0);
                    setIsUpdated(true);

                    setNotifAlert({
                        type: 'success',
                        title: 'Profile Updated',
                        content:
                            "Your profile has been successfully updated. If you don't see the changes, please reload this page",
                        alertPop: true,
                    });
                    // history.go(0);
                }
            } else if (props.user.isRejected) {
                // if (props.user.err.response.data.includes('too large')) {
                //     setIsUpdated(true);
                //     setNotifAlert({
                //         type: 'error',
                //         title: 'Your image size is too large',
                //         content: 'Please try again with another image',
                //         alertPop: true,
                //     });
                // }
            } else {
                setIsUpdated(true);

                setNotifAlert({
                    type: 'error',
                    title: 'Update failed',
                    content: 'Something wrong happened. Please try again later',
                    alertPop: true,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.user.isUpdated, props.user.isRejected]);

    const logout = () => {
        props.postLogout(
            `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/auth/logout`,
            props.token
        );
        persistor.purge();
    };

    return (
        <div className='card card-container profile row'>
            <aside className='col col-4 left-side'>
                <img
                    src={
                        avatar
                            ? `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}${avatar}`
                            : updatedDataUser.picture
                            ? `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}${updatedDataUser.picture}`
                            : Avatar
                    }
                    alt='profile'
                    className='avatar'
                />
                <div className='profile-username'>
                    {updatedDataUser.username}
                </div>
                <div className='profile-email'>{updatedDataUser.email}</div>
                <input
                    type='file'
                    id='image'
                    name='image'
                    accept='image/gif,image/jpeg,image/jpg,image/png'
                    ref={uploadImage}
                    style={{ display: 'none' }}
                    multiple=''
                    data-original-title='upload photos'
                    onChange={uploadImageHandler}
                />
                <Button
                    variant='btn-prof-1 mini'
                    label='Upload photo'
                    onClick={() => {
                        uploadImage.current.click();
                    }}
                />
                <Button
                    variant='btn-prof-2 mini'
                    label='Remove photo'
                    disabled={updatedDataUser.picture ? false : true}
                    onClick={() => {
                        setModalShow(true);
                        setModalMessage(
                            'Are you sure you want to delete your profile photo?'
                        );
                        setModalConfirm({ function: removePhotoHandler });
                    }}
                />
                <Button
                    variant='btn-prof-3 confirm-section'
                    label='Edit Password'
                    disabled={true}
                />
                <div className='confirm-msg confirm-section'>
                    Do you want to save the change?
                </div>
                <Button
                    variant='btn-prof-2 confirm-section'
                    label='Save Change'
                    onClick={() => {
                        setModalShow(true);
                        setModalMessage(
                            'Are you sure you want to save these changes'
                        );
                        setModalConfirm({ function: updateProfileHandler });
                    }}
                    disabled={props.onEditMode ? false : true}
                />
                <Button
                    variant='btn-prof-1 confirm-section'
                    label='Cancel'
                    disabled={props.onEditMode ? false : true}
                    onClick={() => history.go(0)}
                />
                <Button
                    variant='btn-prof-3 confirm-section'
                    label='Log Out'
                    onClick={() => {
                        setModalShow(true);
                        setModalMessage('Are you sure you want to logout?');
                        setModalConfirm({ function: logout });
                    }}
                />
            </aside>
            <aside className='col col-8 right-side'>
                {isUpdated && notifAlert.alertPop && (
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
                {props.children}

                <section className='confirm-section-v2'>
                    <Button variant='btn-prof-3' label='Edit Password' />
                    <div className='confirm-msg'>
                        Do you want to save the change?
                    </div>
                    <Button
                        variant='btn-prof-2'
                        label='Save Change'
                        onClick={() => {
                            setModalShow(true);
                            setModalMessage(
                                'Are you sure you want to save these changes'
                            );
                            setModalConfirm({
                                function: updateProfileHandler,
                            });
                        }}
                        disabled={props.onEditMode ? false : true}
                    />
                    <Button
                        variant='btn-prof-1'
                        label='Cancel'
                        disabled={props.onEditMode ? false : true}
                        onClick={() => history.go(0)}
                    />
                    <Button
                        variant='btn-prof-3'
                        label='Log Out'
                        onClick={() => {
                            setModalShow(true);
                            setModalMessage('Are you sure you want to logout?');
                            setModalConfirm({ function: logout });
                        }}
                    />
                </section>
            </aside>

            <Modal
                msg={modalMessage}
                show={modalShow}
                onHide={() => setModalShow(false)}
                btnvariant='btn-prof-2 outline col'
                btnlabel='Cancel'
                onConfirmation={modalConfirm.function}
                btnvariant2='btn-prof-2  col'
                btnlabel2='Yes, Please'
            />
        </div>
    );
}
const mapStateToProps = (state) => ({
    token: state.auth.results.token,
    // dataUser: state.user.results,
    user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
    postLogout: (url, token) => dispatch(postLogout(url, token)),
    updateUser: (url, token, formData) => {
        dispatch(updateUser(url, token, formData));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
