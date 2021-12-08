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
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                    ext in a modal
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    </Typography>
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