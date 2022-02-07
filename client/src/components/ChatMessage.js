import React from "react";
import AuthService from '../utils/auth';

export default function ChatMessage(props) {
    const userId = AuthService.getProfile().data._id;

    const {message} = props;

    return (
        <div className={userId === message.sender._id ? "chat from-user" : "chat from-other"}>
            <p className="pos post-text">{message.message}</p>
            <div className="pos post-bar">
                <div>
                    <span className="chat-name">{message.sender.username}</span>
                    <span className="chat-date">{message.date_created}</span>
                </div>
            </div>
            <div className="post-bottom">
                <div className='post-options'>
                </div>
            </div>
        </div>
    )
}