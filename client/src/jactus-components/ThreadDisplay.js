import React from "react";

function ThreadDisplay(props) {
    return (
        <main className="thread-wrapper">
            <div className="thread-content-container">
                <div className="thread-header">
                    <h3>Austin Code Bootcamp Students</h3>
                    <p>M: Damien</p>
                </div>
                <div className="chats-container">
                    <div className="chat">
                        <div>
                            <span className="chat-name">Jack</span>
                            <span className="chat-date">November 21st at 8:40pm</span>
                        </div>
                         <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                    </div>
                    <div className="chat">
                        <div>
                            <span className="chat-name">Jack</span>
                            <span className="chat-date">November 21st at 8:40pm</span>
                        </div>
                         <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ThreadDisplay;