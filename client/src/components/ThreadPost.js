import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import ReactionBar from "./ReactionBar";
import EmojiPicker from "./EmojiPicker";
import { Modal, Box } from "@mui/material";
import { emojiModalStyle } from "../utils/constants";

export default function ThreadPost(props) {

    const { post, pin, openEditor, dropdown, remove, setActiveComment } = props;

    const [emojiModal, setEmojiModal] = React.useState(false);

    const openEmojiMart = async () => {
        setEmojiModal(true);
    }

    const closeEmojiMart = async () => {
        setEmojiModal(false);
    }

    const owner = AuthService.getProfile().data._id;

    return (
        <React.Fragment>
        <div data-id={post._id} key={post._id} className="chat">
            <div className="pos post-bar">
                <div>
                    <span className="chat-name">{post.author.username}</span>
                    <span className="chat-date">{post.date_created}</span>
                    {post.edited ? (<span className="edit-span">(edited)</span>):(null)}
                </div>
                {
                owner === post.author._id ? 
                <div className="dropdown">
                    <img className="dots" src="../../assets/img/purple_dots.png" alt="dots" style={{width: "30px", height: "auto", marginRight: "5px", cursor: "pointer"}} onClick={dropdown}/>
                    <div className="dropdown-content">
                        <div className="dropdown-option" onClick={openEditor}>
                            Update
                        </div>
                        <div onClick={remove} >
                            Delete
                        </div>
                    </div>
                </div>
                : <React.Fragment />
                }
            </div>
            <p className="pos post-text">{post.post_text}</p>
            <div className="post-bottom">
                <div className='post-options'>
                    <button className='comments-chip'>
                        <div>{post.comments.length}</div>
                        <Link className='react-link' to={`/subthread/${post._id}`} onClick={setActiveComment}>
                            {post.comments.length === 1 ? (<span>Comment</span>) : (<span>Comments</span>)}
                        </Link>
                    </button>
                    {/* {owner === post.author._id ? 
                    (null) : ( */}
                    {/* )} */}
                    <div className="reaction-bar">
                        <img onClick={openEmojiMart} src="../../assets/img/emoji_icon.png" alt="add reaction" className="add-emoji" />
                        <ReactionBar reactions={post.reactions}/>
                    </div>
                </div>
                <img src="../../assets/img/purple_pin.png" alt="pin" style={{width: "30px", height: "30px", cursor:"pointer"}} onClick={pin}/>
            </div>
            
        </div>
        <Modal
            data-id="emoji-mart"
            open={emojiModal}
            onClose={closeEmojiMart}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={emojiModalStyle}>
                <EmojiPicker closeEmojiMart={closeEmojiMart} elementId={post._id} parentId={post.thread._id} elementType="post"/>
            </Box>
        </Modal>
        </React.Fragment>
    )
}
