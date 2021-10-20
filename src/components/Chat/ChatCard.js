import './Chat.css';
import React from 'react';
import jasonPic from "../../assets/images/jason-pic.png"

function ChatCard() {
    return (
        <div className='chat-card'>
            <div className="container">
                <div className="text-header">
                    <span>Room Chat</span>
                </div>
                <div className="message-list">
                <div className="message ">
                    <img src={jasonPic} className="round-pic" alt="Jason" />
                    <div className="d-flex flex-row justify-content-between flex-grow-1">
                        <div>
                            <div className="sender-name">
                                Jason
                            </div>
                            <div className="message-content"><span>Hey, I’m Jason, Let’s talk and share what’s on your thoughts!</span></div>
                        </div>
                    </div>
                </div>
                <hr/>
                </div>
            </div>
            <div className="container">
                <div className="text-no-chat">
                You have no conversation, start chat other staff ! Have a good day!
                </div>
            </div>
        </div>
    );
}

export default ChatCard;