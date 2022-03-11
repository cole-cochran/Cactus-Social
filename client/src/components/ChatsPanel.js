import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthService from '../utils/auth';

import { useQuery, useMutation } from '@apollo/client';
import { USER_CHATS, USER_FRIENDS } from '../utils/queries';
import { CREATE_CHAT } from '../utils/mutations';
import { modalStyle } from '../utils/constants';
import { ChooseChatMembers } from './Modals/Modals';
import UserChip from './UserChip';

export default function ChatsPanel(props) {

    const {setActiveChat, toggle} = props;

    const userId = AuthService.getProfile().data._id;

    const getAllChats = useQuery(USER_CHATS, {
        variables: {
            userId: userId,
        },
    });
    const getAllFriends = useQuery(USER_FRIENDS, {
        variables: {
            userId: userId,
        },
    });
    const [createChat] = useMutation(CREATE_CHAT, {
        refetchQueries: [USER_CHATS, 'userChats'],
    });
    
    const loading = getAllFriends.loading || getAllChats.loading;

    const [open, setOpen] = React.useState(false);
    const [droppedChats, setDroppedChats] = React.useState(false);
    const [chatMembers, setChatMembers] = React.useState([]);
    const [nonChatFriends, setNonChatFriends] = React.useState([]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const allFriends = getAllFriends.data?.userFriends || [];
    const allChats = getAllChats.data?.userChats || [];

    const handleChatChange = (chat, e) => {
        setActiveChat(chat);
        toggle(e);
    };

    const handleAddChatMember = async (event) => {
        const addedUserId = event.target.id;
        const userUsername = event.target.parentNode.childNodes[1].innerText;

        const addedUser = {
            _id: addedUserId,
            username: userUsername,
        };

        setChatMembers([...chatMembers, addedUser]);

        const filteredFriends = nonChatFriends.filter(
            (friend) => friend._id !== addedUser._id
        );

        setNonChatFriends([...filteredFriends]);
    };

    const handleRemoveChatMember = async (event) => {
        const removedUserId = event.target.id;
        const removedUsername = event.target.parentNode.childNodes[1].innerText;

        const filteredUsers = chatMembers.filter((member) => {
            return member._id !== removedUserId;
        });

        setChatMembers([...filteredUsers]);

        const removedUser = {
            _id: removedUserId,
            username: removedUsername,
        };

        setNonChatFriends([...nonChatFriends, removedUser]);
    };

    const handleCreateNewChat = async (event) => {
        event.preventDefault();
        const newChatUsers = chatMembers.map((member) => member._id);

        try {
            await createChat({
                variables: {
                    participants: [...newChatUsers, userId],
                },
            });
        } catch (err) {
            console.log(err);
        }

        handleClose();
    };

    const handleOpen = () => {
        setOpen(true);
        setNonChatFriends([...allFriends.friends]);
    };
    const handleClose = () => {
        setOpen(false);
        setNonChatFriends([]);
        setChatMembers([]);
    };

    const handleOpenDropdown = (event) => {
        const chatInfo = document.getElementById('chats-dropdown');

        setDroppedChats(true);
        chatInfo.style.display = 'block';
    };

    const handleCloseDropdown = (event) => {
        const chatInfo = document.getElementById('chats-dropdown');

        setDroppedChats(false);
        chatInfo.style.display = 'none';
    };

    return (
        <div id="sidebar-chats-panel">
            <div className="thread-sidebar-header">
                <div>
                    <img
                        style={{
                            width: '35px',
                            height: 'auto',
                            marginRight: '20px',
                            marginLeft: '8px',
                        }}
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
                <img
                    id="chat-create-btn"
                    className="sidebar-add-icon"
                    src="../assets/img/new_cactus_plus.png"
                    alt="click to add thread"
                    onClick={handleOpen}
                />
            </div>
            <ul id="chats-dropdown">
                {allChats.map((chat) => (
                    <li key={chat._id}>
                        <Link onClick={(e) => {handleChatChange(chat._id)}} to={`/chats/${chat._id}`}>
                            <button className="chat-chips">
                                {chat.users.map((user) => (
                                    <div className="chat-chip-div">
                                        <UserChip user={user} />
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
                <Box sx={modalStyle}>
                    <ChooseChatMembers chatMembers={chatMembers} handleRemoveChatMember={handleRemoveChatMember} nonChatFriends={nonChatFriends} handleAddChatMember={handleAddChatMember} handleClose={handleClose} handleCreateNewChat={handleCreateNewChat} />
                </Box>
            </Modal>
        </div>
    );
}
