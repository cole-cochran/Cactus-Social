import React from "react";

import ChatMessage from "./ChatMessage";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import Sidebar from './Sidebar';
import NewNavbar from "../components/NewNavbar";
import Footer from './Footer';

import { CHAT_DETAILS } from "../utils/queries";
import { CREATE_CHAT_MESSAGE, REMOVE_CHAT } from "../utils/mutations";

export default function ChatDisplay(props) {

    const userId = AuthService.getProfile().data._id;

    const { chatId } = useParams();

    const { setActiveThread, setActiveChat, setActiveEvent, socket, activeChat } = props;

    const [ createChatMessage ] = useMutation(CREATE_CHAT_MESSAGE);

    const [ removeChat ] = useMutation(REMOVE_CHAT, {
        refetchQueries: [
            CHAT_DETAILS,
            "chatDetails"
        ]
    });

    const getChatDetails = useQuery(CHAT_DETAILS, {
        variables: {
            chatId: chatId
        }
    });

    let errors = getChatDetails.error;
    let loading = getChatDetails.loading;

    const [chatMessage, setChatMessage] = React.useState("");

    const [chatList, setChatList] = React.useState([]);

    const [messageTimeout, setMessageTimeout] = React.useState(false);

    React.useEffect(() => {
        socket.emit("join_chat", {room: activeChat, user: AuthService.getProfile().data.username});
    }, [activeChat]);

    React.useEffect(() => {
        socket.on('receive_chat_message', (data) => {
            setChatList(chatList => [...chatList, data]);
        })
    }, [socket]);

    if (loading) {
        return <div>Loading...</div>
    }

    const chatDetails = getChatDetails.data?.chatDetails || {};

    const handleCreateChatMessage = async (event) => {
        event.preventDefault();
        try {
            if (socket) {
                const messageData = 
                await createChatMessage({
                    variables: {
                        chatId: chatId,
                        sender: userId,
                        message: chatMessage
                    }
                })

                socket.emit("send_chat_message", {room: activeChat, user: AuthService.getProfile().data.username, message: messageData.data.createChatMessage})
                setMessageTimeout(true);
				setTimeout(() => {setMessageTimeout(false);}, 2000);
            }
        } catch (err) {
            console.log(err);
        }
        setChatMessage("");
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

        window.location.replace(`/profile/${userId}`);
    }

    const handleOpenMessageDropdown = async (event) => {
        const content = event.target.parentNode.childNodes[1];
        content.style.display = "flex"
    }

    const handleCloseMessageDropdown = (event) => {
		if (event.target.className !== "dropdown-content" && event.target.className !== "chat-dots" && event.target.className !== "dropdown-option") {
			const chatDrops = document.querySelectorAll('.dropdown-content');
			for(let chatDrop of chatDrops) {
                if (chatDrop) {
                    chatDrop.style.display = "none";
                }
            }
            
		}
	}

    const handleOpenOptionsDropdown = (event) => {
        const content = event.target.parentNode.childNodes[1];
        content.style.display = "flex"
    }

    const scroll = () => {
		var element = document.getElementById("chat-messages-container");
		element.scrollTop = element.scrollHeight;
	}

    return (
        <div onClick={handleCloseMessageDropdown}>
			<NewNavbar />
            <div className="app-content-container" >
				<Sidebar setActiveThread={setActiveThread} setActiveEvent={setActiveEvent} setActiveChat={setActiveChat}/>
                <div className="chat-display" >
                    <div className="chat-banner">
                        <div className="chat-title-div">
                            <h2>Cactus Chat</h2>
                            <div className="dropdown">
                                <img className="chat-dots" src="../../assets/img/purple_dots.png" alt="chat options" onClick={handleOpenOptionsDropdown}/>
                                <div className="dropdown-content chat-option-dropdown">
                                    <div onClick={handleRemoveChat} >
                                        Remove Chat
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="chat-users-div">
                            <h3>Users:</h3>
                            <div className="chat-users">
                                {chatDetails.users && chatDetails.users.map((user) => (
                                <button key={user._id}>
                                    {user.username}
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div onLoad={scroll} id="chat-messages-container" className="chat-messages-container">
                        {chatDetails.messages && chatDetails.messages.map((message) => (
                            <ChatMessage chatId={chatId} message={message} handleOpenMessageDropdown={handleOpenMessageDropdown} key={message._id}/>
                        ))}
                        {chatList.filter(item => item["chat"]._id === chatId).map(
                            (message) => (
                                <ChatMessage chatId={chatId} message={message} handleOpenMessageDropdown={handleOpenMessageDropdown} key={message._id}/>
                            )
                        )}
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
            </div>
			<Footer />
		</div>
    )
}