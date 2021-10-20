import React, { useState, useEffect, useRef } from 'react';
import InputField from '../UI/InputFieldType2';
import editIcon from './../../assets/images/pen-edit.png';
import { getUser } from '../../redux/actions/user';
import { connect } from 'react-redux';
function CardForm(props) {
    const [editMode, setEditMode] = useState(false);

    const [dataUser, setDataUser] = useState({
        email: '',
        phone: '',
        address: '',
        username: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        gender: '',
        picture: '',
    });

    useEffect(() => {
        props.getUser(
            `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/users`,
            props.token
        );
        // eslint-disable-next-line
    }, []);

    const ref = useRef();

    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
        } else {
            if (props.user.isFulfilled) {
                const { ...data } = props.user.results;
                // console.log(data.email);
                setDataUser({
                    email: data.email,
                    phone: data.phone_number,
                    address: data.delivery_address,
                    username: data.username,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    birthdate: data.birth_date,
                    gender: data.gender,
                    picture: data.picture,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.user.isFulfilled]);
    useEffect(() => {
        props.onEditData({ ...dataUser, picture: dataUser.picture });
        console.log(dataUser.gender);
        props.onEditMode(editMode);

        // eslint-disable-next-line
    }, [dataUser, editMode]);

    return (
        <div className='card card-form-container container-fluid'>
            <div
                className='edit-button'
                onClick={() => {
                    setEditMode(!editMode);
                }}
            >
                <img src={editIcon} alt='Edit Icon' className='edit-icon' />
            </div>
            <div className='main-edit-label'>Contacts</div>
            <div className='row'>
                <InputField
                    label='Email address: '
                    type='email'
                    className='col col-7 left'
                    classLabel='input-label-profile'
                    classInput='profile'
                    value={dataUser.email}
                    disabled={!editMode}
                    onChange={(e) => {
                        setDataUser({ ...dataUser, email: e.target.value });
                    }}
                />
                <InputField
                    label='Mobile Number: '
                    type='tel'
                    className='col col-5 right'
                    classLabel='input-label-profile'
                    prepend='(+62)'
                    classInput='profile prepend'
                    value={
                        dataUser.phone[0] !== '0'
                            ? dataUser.phone
                            : dataUser.phone.slice(1)
                    }
                    disabled={!editMode}
                    onChange={(e) => {
                        setDataUser({ ...dataUser, phone: e.target.value });
                    }}
                />
            </div>
            <div className='row'>
                <InputField
                    label='Delivery Address: '
                    type='text'
                    className='col col-7 left'
                    classLabel='input-label-profile'
                    classInput='profile'
                    value={dataUser.address}
                    disabled={!editMode}
                    onChange={(e) => {
                        setDataUser({ ...dataUser, address: e.target.value });
                    }}
                />
            </div>
            <div className='main-edit-label'>Details</div>
            <div className='row'>
                <InputField
                    label='Display Name: '
                    type='text'
                    className='col col-7 left'
                    classLabel='input-label-profile'
                    classInput='profile'
                    value={dataUser.username}
                    disabled={!editMode}
                    onChange={(e) => {
                        setDataUser({ ...dataUser, username: e.target.value });
                    }}
                />
                <InputField
                    label='MM/DD/YYYY: '
                    type='date'
                    dataDate='dd/mm/yy'
                    className='col col-5 right'
                    classLabel='input-label-profile'
                    classInput='profile'
                    pattern='\d{2}-\d{2}-\d{4}'
                    value={dataUser.birthdate}
                    disabled={!editMode}
                    onChange={(e) => {
                        setDataUser({
                            ...dataUser,
                            birthdate: e.currentTarget.value,
                        });
                    }}
                />
            </div>
            <div className='row'>
                <InputField
                    label='First name: '
                    type='text'
                    className='col col-7 left'
                    classLabel='input-label-profile'
                    classInput='profile'
                    disabled={!editMode}
                    value={dataUser.firstname}
                    onChange={(e) => {
                        setDataUser({ ...dataUser, firstname: e.target.value });
                    }}
                />
            </div>
            <div className='row'>
                <InputField
                    label='Last name: '
                    type='text'
                    className='col col-7 left'
                    classLabel='input-label-profile'
                    classInput='profile'
                    disabled={!editMode}
                    value={dataUser.lastname}
                    onChange={(e) => {
                        setDataUser({ ...dataUser, lastname: e.target.value });
                    }}
                />
            </div>
            <div className='row text-center'>
                <div className='col sel-gender'>
                    <input
                        type='radio'
                        id='male'
                        name='gender'
                        value='male'
                        disabled={!editMode}
                        checked={dataUser.gender === 'male' ? true : false}
                        onChange={(e) => {
                            setDataUser({
                                ...dataUser,
                                gender: e.target.value,
                            });
                        }}
                    />
                    <label htmlFor='male'>Male</label>
                </div>
                <div className='col sel-gender'>
                    <input
                        type='radio'
                        id='female'
                        name='gender'
                        value='female'
                        disabled={!editMode}
                        checked={dataUser.gender === 'female' ? true : false}
                        onChange={(e) => {
                            setDataUser({
                                ...dataUser,
                                gender: e.target.value,
                            });
                        }}
                    />
                    <label htmlFor='female'>Female</label>
                </div>
            </div>
            <span className='line-bottom'></span>
        </div>
    );
}

// export default CardForm;
const mapStateToProps = (state) => {
    return {
        token: state.auth.results.token,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getUser: (url, token) => {
        dispatch(getUser(url, token));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
