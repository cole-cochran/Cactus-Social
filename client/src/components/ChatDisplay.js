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
        <div>
            <div>
                <h2>Chat</h2>
                <div>
                    <h3>Users:</h3>
                    {chatDetails.users.map((user) => (
                    <button key={user._id}>
                        {user.username}
                    </button>
                    ))}
                </div>
            </div>
            <div>
                {chatDetails.messages.map((message) => (
                    <ChatMessage message={message} key={message._id}/>
                ))}
            </div>
            <div>
                <form onSubmit={handleCreateChatMessage}>
                    <textarea name="createMessage" onChange={handleChange} value={chatMessage} placeholder="Chat Message"/>
                    <button type="submit">
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}