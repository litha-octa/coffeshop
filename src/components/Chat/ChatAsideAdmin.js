import './Chat.css';
import React from 'react';
import zulaikhaPic from '../../assets/images/zulaicha-pic.png';

function ChatAsideAdmin() {
    return (
        <aside className='left-aside'>
            <div className='search'>
                <input
                    type='text'
                    className='input-search'
                    placeholder='Search Chat'
                />
            </div>
            <div className='text-header'>
                Choose a Conversation to start a chat
            </div>
            <div className='message-list'>
                <div className='message'>
                    <img src={zulaikhaPic} className='round-pic' alt='Jason' />
                    <div className='d-flex flex-row justify-content-between flex-grow-1'>
                        <div>
                            <div className='sender-name'>
                                <span>Zulaikha</span>
                            </div>
                            <div className='message-content'>
                                Hey jason, I can’t find the promo section. Can u
                                tell me where is it?
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className='text-no-chat'>
                You have no conversation, start chat other staff ! Have a good
                day!
            </div>
        </aside>
    );
}

export default ChatAsideAdmin;
