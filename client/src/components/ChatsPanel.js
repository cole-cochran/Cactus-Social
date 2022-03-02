import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthService from '../utils/auth';

import { useQuery, useMutation } from '@apollo/client';

import { CloudinaryContext, Image } from 'cloudinary-react';

import { USER_CHATS, USER_FRIENDS } from '../utils/queries';
import { CREATE_CHAT } from '../utils/mutations';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    maxWidth: "500px",
    bgcolor: '#232323',
    boxShadow: 24,
    border: '2px solid white'
};

export default function ChatsPanel(props) {
    // const {setActiveChat} = props;
    const userId = AuthService.getProfile().data._id;

    const getAllChats = useQuery(USER_CHATS, {
        variables: {
            userId: userId
        }
    });
    const getAllFriends = useQuery(USER_FRIENDS, {
        variables: {
            userId: userId
        }
    });

    const loading = getAllFriends.loading || getAllChats.loading;

    const [ createChat ] = useMutation(CREATE_CHAT, {
        refetchQueries: [
            USER_CHATS,
            "userChats"
        ]
    });
    
    const [open, setOpen] = React.useState(false);

    const [droppedChats, setDroppedChats] = React.useState(false);

    const [chatMembers, setChatMembers] = React.useState([]);
    const [nonChatFriends, setNonChatFriends] = React.useState([]);

    if (loading) {
        return <h2>Loading...</h2>
    }

    const allFriends = getAllFriends.data?.userFriends || [];
    const allChats = getAllChats.data?.userChats || [];

    const handleAddChatMember = async (event) => {

        const addedUserId = event.target.id;
        const userUsername = event.target.parentNode.childNodes[1].innerText;

        const addedUser = {
            _id: addedUserId,
            username: userUsername
        };

        setChatMembers([...chatMembers, addedUser]);

        const filteredFriends = nonChatFriends.filter((friend) => (friend._id !== addedUser._id));

        setNonChatFriends([...filteredFriends]);
    }

    const handleRemoveChatMember = async (event) => {
        const removedUserId = event.target.id;
        const removedUsername = event.target.parentNode.childNodes[1].innerText;

        const filteredUsers = chatMembers.filter((member) => {
            return member._id !== removedUserId
        });

        setChatMembers([...filteredUsers]);
        // console.log([...chatMembers])

        const removedUser = {
            _id: removedUserId,
            username: removedUsername
        }

        setNonChatFriends([...nonChatFriends, removedUser]);
    }

    const handleCreateNewChat = async (event) => {
        event.preventDefault();
        const newChatUsers = chatMembers.map((member) => (
            member._id
        ))

        try {
            // console.log([...newChatUsers, userId])
            await createChat({
                variables: {
                    participants: [...newChatUsers, userId]
                }
            })
        } catch(err) {
            console.log(err);
        }

        handleClose();
    }

    const handleOpen = () => {
        setOpen(true);
        setNonChatFriends([...allFriends.friends]);
    }
    const handleClose = () => {
        setOpen(false);
        setNonChatFriends([]);
        setChatMembers([]);
    }

    const handleEventChange = (event) => {
        // setActiveChat(event);
    }

    const handleOpenDropdown = (event) => {
        const chatInfo = document.getElementById("chats-dropdown");

        setDroppedChats(true);
        chatInfo.style.display = "block";
    }

    const handleCloseDropdown = (event) => {
        const chatInfo = document.getElementById("chats-dropdown");

        setDroppedChats(false);
        chatInfo.style.display = "none";
    }

    // console.log(allChats)

    return (
        <div id="sidebar-chats-panel">
            <div className="thread-sidebar-header">
                <div>
                    <img
                        style={{width: "35px", height: "auto", marginRight: "20px", marginLeft: "8px"}}
                        src="../../assets/img/cactus-speech-bubble.svg"
                        alt="events icon"
                    />
                    <h3>Chats</h3>
                    {droppedChats ? (
                        <img
                            src="/assets/img/up_btn.png"
                            alt="threads icon"
                            onClick={handleCloseDropdown}
                        />
                    ) : (
                        <img
                            src="/assets/img/down_btn.png"
                            alt="threads icon"
                            onClick={handleOpenDropdown}
                        />
                    )}
                    
                </div>
                <img id="chat-create-btn" className="sidebar-add-icon" src="../assets/img/new_cactus_plus.png" alt="click to add thread" onClick={handleOpen}/>
            </div>
            <ul
            id="chats-dropdown">
                {allChats.map((chat) => (
                    <li key={chat._id}>
                        <Link onClick={(e) => {handleEventChange(chat._id)}} to={`/chats/${chat._id}`} >
                            <button className="chat-chips">{chat.users.map((user) => (
                                <div className="chat-chip-div">
                                {user.picture === "" ? (
                                    <div className="chat-chip-img">
                                        <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                    </div>
                                ) : (
                                    <CloudinaryContext cloudName="damienluzzo" >
									    <Image className="friend-pic"  publicId={`CactusSocial/${user.picture}`} />
								    </CloudinaryContext>
                                )}
                            <div className="chat-chip-span">
                                {/* {chat.users.map((user) => ( */}
                                <span>{user.username}</span> 
                            
                            </div>

                            </div>
                            ))}
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="chat-create-div">
                        <div className="chat-create-main">
                            <h2>Who Do You Want To Chat With?</h2>
                            <div className="selected-chat-friends">
                                <h3>Chosen Friends</h3>
                                <ul>
                                    {chatMembers && chatMembers.map((user, index) => (
                                        <li key={`${user}-${index}`}>
                                            {/* <a href = {`/profile/${user._id}`}> */}
                                                <button style={{cursor: "default"}} className="friend-chips">
                                                    <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                                    <p>{user.username}</p>
                                                    <img 
                                                    src="../../assets/img/open-circle.svg" 
                                                    alt="open check box" 
                                                    style={{height: "20px", marginLeft: "15px", cursor: "pointer"}}
                                                    onClick={handleRemoveChatMember}
                                                    id={user._id}
                                                    />
                                                </button>
                                            {/* </a> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="all-friends-div">
                                <h3>Friends</h3>
                                <ul>
                                    {nonChatFriends && nonChatFriends.map((user, index) => (
                                        <li key={`${user}-${index}`}>
                                            {/* <a href = {`/profile/${user._id}`}> */}
                                                <button style={{cursor: "default"}} className="friend-chips">
                                                    <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                                    <p>{user.username}</p>
                                                    <img 
                                                    src="../../assets/img/open-circle.svg" 
                                                    alt="open check box" 
                                                    style={{height: "20px", marginLeft: "15px", cursor: "pointer"}}
                                                    onClick={handleAddChatMember}
                                                    id={user._id}
                                                    />
                                                </button>
                                            {/* </a> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="chat-create-actions">
                            <button className="cancel-button" onClick={handleClose}>
                                Cancel
                            </button>
                            <button className="create-button" onClick={handleCreateNewChat} disabled={chatMembers.length === 0 ? true : false}>
                                Create Chat
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}