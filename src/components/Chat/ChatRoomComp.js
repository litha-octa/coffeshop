import './Chat.css';
import React from 'react';
import zulaikhaPic from "../../assets/images/zulaicha-pic.png"
import jasonPic from "../../assets/images/jason-pic.png"
import addPhotos from "../../assets/images/add-photos.png"

function ChatRoomComp() {
    return (
        <div className='chat-card'>
            <div className="container">
                <div className="text-header">
                    <span>Jason</span>
                </div>
            </div>
            <div className="container">
            <div className="chat-room">
                <div className="message-list">
                    <div className="message flex-row-reverse">
                        <img src={zulaikhaPic} className="round-pic" alt="Jason" />
                        <div className="d-flex flex-row flex-grow-1">
                            <div>
                                <div id="sender" className="sender-name">
                                <div id="date-content-sender">02.14 PM</div>
                                    <span>Zulaikha</span>  
                                </div>
                                <div className="message-content"><span>Hey jason, I can’t find the promo section. Can u tell me where is it?</span></div>
                            </div>
                        </div>
                    </div>
                <hr/>
                </div>
            </div>
            </div>
            <div className="container">
            <div className="chat-room">
                <div className="message-list">
                    <div className="message">
                        <img src={jasonPic} className="round-pic" alt="Jason" />
                        <div className="d-flex flex-row flex-grow-1">
                            <div className="testing">
                                <div className="sender-name">
                                    Jason
                                </div>
                                <div className="message-content"><span>Hey, thanks for asking. It’s in product menu, you can see them on the left side.</span></div>
                            </div>
                        </div>
                    </div>
                <hr/>
                </div>
            </div>
            </div>
            <div className="container">
            <div className="chat-room">
                <div className="message-list">
                    <div className="message flex-row-reverse">
                        <img src={zulaikhaPic} className="round-pic" alt="Jason" />
                        <div className="d-flex flex-row flex-grow-1">
                            <div>
                                <div id="sender" className="sender-name">
                                <div id="date-content-sender">02.14 PM</div>
                                    <span>Zulaikha</span>  
                                </div>
                                <div className="message-content"><span>Hey jason, I can’t find the promo section. Can u tell me where is it?</span></div>
                            </div>
                        </div>
                    </div>
                <hr/>
                </div>
            </div>
            </div>
            <div className="send">
                <input type="text" className="send-text"></input>
                <img src={addPhotos} className="photos-icon" alt=""/>
            </div>
        </div>
    );
}

export default ChatRoomComp;