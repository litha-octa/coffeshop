import React from 'react';
import ChatAside from "../components/Chat/ChatAside"
import ChatCard from "../components/Chat/ChatCard"
function Chat() {
    return (
        <div className='chat-container container-fluid'>
            <div className='chat-aside-container'>
                <ChatAside/>
                <ChatCard/>
            </div>
        </div>
    );
}

export default Chat;
