import React from "react";

function Footer(props) {
    return (
        <div className="chat-input">
            <span contenteditable="true">"what's on your mind?"</span>
            <div className="chat-input-buttons">
                <button className="chat-input-send-button">send</button>
            </div>
        </div>
    )
}

export default Footer;
