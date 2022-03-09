import React from "react";
import AuthService from '../utils/auth';
import ReactionBar from "./ReactionBar";
import EmojiPicker from "./EmojiPicker";
import { Modal, Box } from "@mui/material";

import { modalStyle } from "../utils/constants";

export default function EventComment(props) {

    const {comment, handleCommentDropdown, handleOpenCommentEditor, handleRemoveComment} = props;
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
        <div key={comment._id} data-id={comment._id} className="chat event-chat">
            <div className="pos post-bar">
                <div>
                    <span className="chat-name">{comment.author.username}</span>
                    <span className="chat-date">{comment.date_created}</span>
                    {comment.edited ? (<span className="edit-span">(edited)</span>):(null)}
                </div>
                { owner === comment.author._id ? 
                <div className="dropdown">
                    <img className="dots" src="../../assets/img/purple_dots.png" alt="dots" style={{width: "30px", height: "auto", marginRight: "5px", cursor: "pointer"}} onClick={handleCommentDropdown}/>
                    <div className="dropdown-content">
                        <div className="dropdown-option" onClick={handleOpenCommentEditor}>
                            Update
                        </div>
                        <div onClick={handleRemoveComment} >
                            Delete
                        </div>
                    </div>
                </div>
                : <React.Fragment />
            }
            </div>
            <p>{comment.comment_text}</p>
            <div className="reaction-bar">
                <img onClick={openEmojiMart} src="../../assets/img/emoji_icon.png" alt="add reaction" className="add-emoji"/>
                <ReactionBar reactions={comment.reactions}/>
            </div>
        </div>
        <Modal
        data-id="emoji-mart"
        open={emojiModal}
        onClose={closeEmojiMart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={modalStyle}>
            {(emojiModal && comment._id && comment.event._id) ?
                (<EmojiPicker closeEmojiMart={closeEmojiMart} elementId={comment._id} parentId={comment.event._id} elementType="event-comment"/>)
                : <React.Fragment />
            }
        </Box>
        </Modal>
        </React.Fragment>
    )

}