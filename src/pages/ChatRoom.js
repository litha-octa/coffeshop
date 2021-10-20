import React from 'react';
import ChatAside from "../components/Chat/ChatAside"
import ChatRoomComp from "../components/Chat/ChatRoomComp"
function ChatRoom() {
    return (
        <div className='chat-container container-fluid'>
            <div className='chat-aside-container'>
            <ChatAside/>
            <ChatRoomComp/>
            </div>
        </div>
    );
}

export default ChatRoom;
