import React from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { THREAD_DETAILS } from '../utils/queries';
//* THREAD_RETAILS requires threadId and gives us access to  
import { CREATE_POST, REMOVE_POST, UPDATE_POST, PIN_POST, UNPIN_POST, ADD_POST_REACTION } from '../utils/mutations';
//! Give description of imported mutations


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};


function ThreadDisplay(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <main className="thread-wrapper">
                <div className="thread-content-container">
                    {/* <div className="top-panel"> */}
                        <div className="thread-header">
                            <h3>Austin Code Bootcamp Students</h3>
                            <div>
                                <p>M: Damien</p>
                            </div>
                        </div>
                        <div className="chats-container">
                            <div className="chat subthread" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                    <span className="subthread-title">#wagons</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <div className="chat" onClick={handleOpen}>
                                <div>
                                    <span className="chat-name">Jack</span>
                                    <span className="chat-date">November 21st at 8:40pm</span>
                                </div>
                                <p>I'm baby seitan health goth wayfarers, succulents direct trade microdosing ethical drinking vinegar chia. Flannel chambray gluten-free sustainable letterpress echo </p>
                            </div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <form className="modal-form">
                                        <div className="modal-header">
                                            <h4>Add Subthread</h4>
                                        </div>
                                        <label>Pin Title</label>
                                        <input placeholder="e.g. Cactus Party"/>
                                        <label>Pin Hash</label>
                                        <input placeholder="e.g. #cactus-party"/>
                                        <button className="modal-button" type="submit">Add</button>
                                    </form>
                                </Box>
                             </Modal>
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