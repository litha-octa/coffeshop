import './Chat.css';
import React from 'react';
import zulaikhaPic from "../../assets/images/zulaicha-pic.png"
import jasonPic from "../../assets/images/jason-pic.png"
import addPhotos from "../../assets/images/add-photos.png"

function ChatCardAdmin() {
    return (
        <div className='chat-card' id="admin-chat-card">
            <div className="container">
                <div className="text-header">
                    <span>Zulaikha</span>
                </div>
                <div className="chat-room">
                <div className="message-list">
                    <div className="message">
                        <img src={zulaikhaPic} className="round-pic" alt="Jason" />
                        <div className="d-flex flex-row flex-grow-1">
                            <div>
                                <div className="message-content">
                                    <span>Hey jason, I can’t find the promo section. Can u tell me where is it?</span>
                                    <div id="date-content">02.14 PM</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                <hr id="hr-color"/>
                <div className="message flex-row-reverse">
                        <img src={jasonPic} className="round-pic" alt="Jason" />
                        <div className="d-flex flex-row flex-grow-1">
                            <div>
                                <div className="message-content">
                                    <span>Hey, thanks for asking. It’s in product menu, you can see them on the left side.</span>
                                    <div id="date-content">02.14 PM</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                <hr id="hr-color"/>
                </div>
            </div>
            <div className="send" id="send-bottom">
                <input type="text" className="send-text"></input>
                <img src={addPhotos} className="photos-icon" alt=""/>
            </div>
            </div>
            
            
        </div>
    );
}

export default ChatCardAdmin