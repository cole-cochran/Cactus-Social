import React from "react";

export default function ChatMessage(props) {

    const {message} = props;

    return (
        <div>
            <div>
                <p>{message.message}</p>
            </div>
            <div>
                <p>{message.sender.username}</p>
                <p>{message.date_created}</p>
            </div>
        </div>
    )
}