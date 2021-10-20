import React from 'react';
import ChatAsideAdmin from "../components/Chat/ChatAsideAdmin"
import ChatCardAdmin from "../components/Chat/ChatCardAdmin"
function ChatRoomAdmin() {
    return (
        <div className='chat-container container-fluid'>
            <div className='chat-aside-container'>
                <ChatAsideAdmin/>
                <ChatCardAdmin/>
            </div>
        </div>
    );
}

export default ChatRoomAdmin;
