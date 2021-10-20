import './Chat.css';
import React from 'react';
import jasonPic from "../../assets/images/jason-pic.png"
import cherynPic from "../../assets/images/cheryn-pic.png"
import louPic from "../../assets/images/lou-pic.png"

function ChatAside() {
    return (
            <aside className="left-aside">
                <div className="search">
                    <input type="text" className="input-search" placeholder="Search Chat" />
                </div>
                <div className="text-header">
                    Choose a staff to talk with
                </div>
                <div className="message-list">
                <div className="message">
                    <img src={jasonPic} className="round-pic" alt="Jason" />
                    <div className="d-flex flex-row justify-content-between flex-grow-1">
                        <div>
                            <div className="sender-name"><span>Jason</span></div>
                            <div className="message-content">Hey, I’m Jason, Let’s talk and share what’s on your thoughts!</div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="message">
                    <img src={cherynPic} className="round-pic" alt="Cheryn" />
                    <div className="d-flex flex-row justify-content-between flex-grow-1">
                        <div>
                            <div className="sender-name"><span>Cheryn</span></div>
                            <div className="message-content">Hey, I’m Cheryn, can I help you? Just chat me if you have some trouble in ordering, happy shopping!</div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="message">
                    <img src={louPic} className="round-pic" alt="lou" />
                    <div className="d-flex flex-row justify-content-between flex-grow-1">
                        <div>
                            <div className="sender-name"><span>Lou</span></div>
                            <div className="message-content">Hey, I’m Lou, I’ll here to help you, just talk to me and we solve the problme. Have a good day!</div>
                        </div>
                    </div>
                </div>
                <hr/>
                </div>
            </aside>
    );
}

export default ChatAside;
