import React from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { ALL_THREAD_POSTS, THREAD_DETAILS, PINNED_POSTS } from '../utils/queries';
//* THREAD_DETAILS requires threadId and gives us access to

import { CREATE_POST, REMOVE_POST, UPDATE_POST, PIN_POST, UNPIN_POST, ADD_POST_REACTION, REMOVE_THREAD } from '../utils/mutations';
//! Give description of imported mutations


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

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

    const { threadId } = useParams();

    const singleThread = useQuery(THREAD_DETAILS, {
        variables: { threadId: threadId },
    });

    const threadPosts = useQuery(ALL_THREAD_POSTS, {
        variables: { threadId: threadId },
    });
    
    const errors = singleThread.error || threadPosts.error;
    const loading = singleThread.loading || threadPosts.loading;


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [newPost, setNewPost] = React.useState('');
    // const [editPost, setEditPost] = React.useState('');
    const [pinning, setPinning] = React.useState(false);

    if (loading) {
        return <p>loading...</p>;
    }

    return (
        <main className="thread-wrapper">
                <div className="thread-content-container">
                    {/* <div className="top-panel"> */}
                        <div className="thread-header">
                            <h3>Austin Code Bootcamp Students</h3>
                            {/* <h3>
                                {singleThread.title}
                            </h3> */}
                            <div>
                                <p>M: Damien</p>
                                {/* <p>{singleThread.moderator}</p> */}
                            </div>
                        </div>
                        <div className="chats-container">
                            {/* {errors && <h3 style={{ color: 'red' }}>{errors}</h3>}
                            {threadPosts.map((post) => (
                                post.pinned ? (
                                    <React.Fragment>
                                        <div className="chat subthread" onClick={handleOpen}>
                                        <span className="chat-name">{post.author}</span>
                                        <span className="chat-date">{post.date_created}</span>
                                        { post.pinHash && 
                                        <Link to={`/subthread/${post._id}`}>
                                            <span className="subthread-title">{post.pinHash}</span>
                                        </Link>
                                        }
                                        </div>
                                        <p>{post.post_text}</p>
                                        <Link to={`/profile/${post._id}`}>
                                            <Chip label="Comments" size="small" avatar={<Avatar>{post.comments.length}</Avatar>} />
                                        </Link>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <div className="chat" onClick={handleOpen}>
                                            <div>
                                                <span className="chat-name">{post.author}</span>
                                                <span className="chat-date">{post.date_created}</span>
                                            </div>
                                            <p>{post.post_text}</p>
                                            <Link to={`/profile/${post._id}`}>
                                                <Chip label="Comments" size="small" avatar={<Avatar>{post.comments.length}</Avatar>} />
                                            </Link>
                                        </div>
                                    </React.Fragment>
                                )
                            ))} */}
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