import React from 'react';
import './AuthPage.css';
import { useHistory } from 'react-router-dom';
import logoIcon from '../../assets/images/coffee 1.png';
import Footer from './FooterForAuth';

function AuthContainer(props) {
    const history = useHistory();
    return (
        <>
            <div className='row auth-container container-fluid'>
                <aside className='col col-6 left-side'></aside>
                <aside className='col col-6 right-side'>
                    <header>
                        <div
                            onClick={() => history.push('/home')}
                            className='logo'
                        >
                            <img src={logoIcon} alt='logo-icon' />
                            <span>Coffee Shop</span>
                        </div>
                        {props.menu && (
                            <div className='menu' onClick={() => history.go(0)}>
                                {props.menu}
                            </div>
                        )}
                    </header>

                    <main className='auth-body'>{props.children}</main>

                    <Footer />
                </aside>
            </div>
        </>
    );
}

export default AuthContainer;
