import React from "react";
import AuthService from '../utils/auth';
import ReactionBar from "./ReactionBar";
import EmojiPicker from "./EmojiPicker";
import { Modal, Box } from "@mui/material";

import { useMutation } from '@apollo/client';

import { UPDATE_CHAT_MESSAGE, DELETE_CHAT_MESSAGE } from "../utils/mutations";
import { CHAT_DETAILS } from "../utils/queries";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24
};

export default function ChatMessage(props) {
    const userId = AuthService.getProfile().data._id;

    const {message, chatId, handleOpenMessageDropdown} = props;

    const [ updateChatMessage ] = useMutation(UPDATE_CHAT_MESSAGE, {
        refetchQueries: [
            CHAT_DETAILS,
            "chatDetails"
        ]
    });

    const [ deleteChatMessage ] = useMutation(DELETE_CHAT_MESSAGE, {
        refetchQueries: [
            CHAT_DETAILS,
            "chatDetails"
        ]
    });

    const [updatedMessage, setUpdatedMessage] = React.useState("");
    const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

    const handleDeleteChatMessage = async (event) => {
        event.preventDefault();
        const messageId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        try {
            await deleteChatMessage({
                variables: {
                    chatId: chatId,
                    messageId: messageId
                }
            })
        } catch(err) {
            console.log(err);
        }
        
    }

    const handleUpdateChatMessage = async (event) => {
        event.preventDefault();
        const messageId = JSON.parse(localStorage.getItem("messageId"));
        try {
            await updateChatMessage({
                variables: {
                    chatId: chatId,
                    messageId: messageId,
                    message: updatedMessage
                }
            })
        } catch (err) {
            console.log(err);
        }
        handleCloseUpdateModal();
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === "updatedMessage") {
            setUpdatedMessage(value);
        }
    }

    const handleOpenUpdateModal = async (event) => {
        setOpenUpdateModal(true);
        const updatedMessageId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(updatedMessageId);

        localStorage.setItem('messageId', JSON.stringify(updatedMessageId));

        const updatedMessageText = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].innerText;
        console.log(updatedMessageText)
        setUpdatedMessage(updatedMessageText);
    }

    const handleCloseUpdateModal = async (event) => {
        localStorage.removeItem('messageId');
        setOpenUpdateModal(false);
        setUpdatedMessage("");
    }

    return (
        <React.Fragment>
            <div id={message._id} className={userId === message.sender._id ? "chat from-user" : "chat from-other"}>
            <p className="pos post-text">{message.message}</p>
            <div className="pos post-bar dm-bar">
                <div>
                    <span className="chat-name">{message.sender.username}</span>
                    <span className="chat-date">{message.date_created}</span>
                </div>
                {userId === message.sender._id ? (
                    <div className="dropdown">
                        <img className="dots" src="../../assets/img/dotdotdot.svg" alt="user options" onClick={handleOpenMessageDropdown}/>
                        <div className="dropdown-content">
                            <div className="dropdown-option" onClick={handleOpenUpdateModal}>
                                Update
                            </div>
                            <div onClick={handleDeleteChatMessage} >
                                Delete
                            </div>
                        </div>
                    </div>
                ) : (
                    <React.Fragment />
                )}
            </div>
            <div className="post-bottom">
                <div className='post-options'>
                </div>
            </div>
        </div>
        <Modal
            data-id="editor"
            open={openUpdateModal}
            onClose={handleCloseUpdateModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form className="modal-form" onSubmit={handleUpdateChatMessage}>
                    <div className="modal-header">
                        <h4>Update Message</h4>
                    </div>
                    <label>Message Text</label>
                    <input value={updatedMessage} name="updatedMessage" onChange={handleChange} placeholder="e.g. Cactus Party" />
                    <button className="modal-button" type="submit">
                        Update
                    </button>
                </form>
            </Box>
        </Modal>
        </React.Fragment>
        
    )
}