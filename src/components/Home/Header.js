import React, { useState } from 'react';
import './Header.css';

import { Link, useParams, useHistory } from 'react-router-dom';
import logoIcon from '../../assets/images/coffee 1.png';
import searchIcon from '../../assets/images/search-icon.png';
import chatIcon from '../../assets/images/chat-icon.png';
import avaSample from '../../assets/images/blank-ava.jpg';
import { connect } from 'react-redux';
function Header(props) {
    const { section } = useParams();
    const history = useHistory();
    const [searchBar, setSearchBar] = useState(false);

    const loginHeader = (
        <div className='login-header-group'>
            <div className='search-section'>
                {!searchBar ? (
                    <img
                        className='search-icon-header'
                        src={searchIcon}
                        alt='search icon'
                        onClick={() => {
                            setSearchBar(true);
                        }}
                    />
                ) : (
                    <div className='form-group has-search'>
                        <span
                            className='fa fa-search form-control-feedback'
                            onClick={() => {
                                setSearchBar(false);
                            }}
                        ></span>
                        <input
                            type='text'
                            class='form-control'
                            placeholder='Search'
                            onChange={(e) =>
                                history.replace('?q=' + e.target.value)
                            }
                        />
                    </div>
                )}
            </div>
            <Link to='/chat' className='chat-section'>
                <div className='chat-counter'>1</div>
                <img
                    className='chat-icon-header'
                    src={chatIcon}
                    alt='chat-icon'
                />
            </Link>
            <Link to='/profile' className='prof-pic-section'>
                <img
                    className='prof-pic-header'
                    src={
                        props.avatar
                            ? `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}${props.avatar}`
                            : avaSample
                    }
                    alt='profile'
                />
            </Link>
        </div>
    );
    return (
        <nav className='header-container container-fluid'>
            <div className='title-nav'>
                <div className='logo'>
                    <img src={logoIcon} alt='logo-icon' />
                    <span>Coffee Shop</span>
                </div>
            </div>
            <div className='list-nav'>
                <Link to='/' className={!section ? 'selected-list-nav' : null}>
                    Home
                </Link>
                <Link
                    to={props.isLogin ? '/product' : '/login'}
                    className={
                        section === 'product' ? 'selected-list-nav' : null
                    }
                >
                    Product
                </Link>
                <Link
                    to={props.isLogin ? 'orders' : '/login'}
                    className={
                        section === 'orders' ? 'selected-list-nav' : null
                    }
                >
                    Your Cart
                </Link>
                <Link
                    to={props.isLogin ? '/history' : '/login'}
                    className={
                        section === 'history' ? 'selected-list-nav' : null
                    }
                >
                    History
                </Link>
            </div>
            {props.isLogin ? (
                loginHeader
            ) : (
                <div className='button-auth'>
                    <button onClick={() => history.push('/login')}>
                        Login
                    </button>
                    <button onClick={() => history.push('/register')}>
                        Sign Up
                    </button>
                </div>
            )}
        </nav>
    );
}

// export default Header;
const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        avatar: state.user.results.picture,
    };
};
export default connect(mapStateToProps)(Header);
