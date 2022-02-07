import React from "react";

import ChatMessage from "./ChatMessage";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { CHAT_DETAILS } from "../utils/queries";
import { CREATE_CHAT_MESSAGE, REMOVE_CHAT } from "../utils/mutations";

export default function ChatDisplay(props) {

    const userId = AuthService.getProfile().data._id;

    const { chatId } = useParams();

    const [ createChatMessage ] = useMutation(CREATE_CHAT_MESSAGE, {
        refetchQueries: [
            CHAT_DETAILS,
            "chatDetails"
        ]
    });

    const [ removeChat ] = useMutation(REMOVE_CHAT);

    const getChatDetails = useQuery(CHAT_DETAILS, {
        variables: {
            chatId: chatId
        }
    });

    let errors = getChatDetails.error;
    let loading = getChatDetails.loading;

    const [chatMessage, setChatMessage] = React.useState("");

    if (loading) {
        return <div>Loading...</div>
    }

    const chatDetails = getChatDetails.data?.chatDetails || {};

    console.log(chatDetails);

    const handleCreateChatMessage = async (event) => {
        event.preventDefault();
        try {
            await createChatMessage({
                variables: {
                    chatId: chatId,
                    sender: userId,
                    message: chatMessage
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === "createMessage") {
            setChatMessage(value);
        }
    }

    const handleRemoveChat = async (event) => {
        event.preventDefault();
        try {
            await removeChat({
                variables: {
                    chatId: chatId,
                    userId: userId
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="chat-display">
            <div className="chat-banner">
                <h2>Cactus Chat</h2>
                <div className="chat-users-div">
                    <h3>Users:</h3>
                    <div className="chat-users">
                        {chatDetails.users.map((user) => (
                        <button key={user._id}>
                            {user.username}
                        </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="chat-messages-container">
                {chatDetails.messages.map((message) => (
                    <ChatMessage message={message} key={message._id}/>
                ))}
            </div>
            <div className="chat-message-submit-div">
                <form onSubmit={handleCreateChatMessage} className="chat-input">
                    <textarea name="createMessage" onChange={handleChange} value={chatMessage} placeholder="Chat Message"/>
                    <div className="chat-input-buttons">
                        <button className="chat-input-send-button" type="submit">
                            Send
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}