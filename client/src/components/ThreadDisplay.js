import React from "react";
import TextField from "@material-ui/core/TextField";

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { THREAD_DETAILS } from '../utils/queries';
//* THREAD_RETAILS requires threadId and gives us access to  
import { CREATE_POST, REMOVE_POST, UPDATE_POST, PIN_POST, UNPIN_POST, ADD_POST_REACTION } from '../utils/mutations';
//! Give description of imported mutations


const styles = {
    
};

function ThreadDisplay(props) {
    return (
        <main className="thread-wrapper">
                <div className="thread-content-container">
                    {/* <div className="top-panel"> */}
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
                            <div className="chat">
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                        </div>
                    {/* </div> */}
                    {/* <div> */}
                        <div className="chat-input">
                            <span contenteditable="true">"what's on your mind?"</span>
                            <div className="chat-input-buttons">
                                <button className="chat-input-send-button">send</button>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
        </main>
    )
}

export default ThreadDisplay;