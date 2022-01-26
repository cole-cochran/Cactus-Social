import React from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UserSearchModal from './UserSearchModal';
// import {Link} from 'react-router-dom';

import { ALL_USERS, FRIEND_REQUESTS, SENT_FRIEND_REQUESTS, USER_FRIENDS } from '../utils/queries';
import { ADD_FRIEND, DENY_FRIEND_REQUEST } from '../utils/mutations';

import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';


function ProfileFriends(props) {

    const userId = AuthService.getProfile().data._id;
    // const [searchUsername, setSearchUsername] = React.useState('');
    // const friendsQuery = useQuery(USER_FRIENDS);
    const getAllUsers = useQuery(ALL_USERS);
    const allFriendRequests = useQuery(FRIEND_REQUESTS, {
        variables: {
            userId: userId
        }
    });
    const allSentFriendRequests = useQuery(SENT_FRIEND_REQUESTS, {
        variables: {
            userId: userId
        }
    });
    const getAllFriends = useQuery(USER_FRIENDS, {
        variables: {
            userId: userId
        }
    });

    const [ addFriend ] = useMutation(ADD_FRIEND, {
        refetchQueries: [
            USER_FRIENDS,
            "userFriends"
        ]
    });

    const [ denyFriendRequest ] = useMutation(DENY_FRIEND_REQUEST, {
        refetchQueries: [
            FRIEND_REQUESTS,
            "friendRequests"
        ]
    });

    // const friendsQuery = useQuery(USER_FRIENDS);
    const [openSearch, setOpenSearch] = React.useState(false);
    const [openFriendRequests, setOpenFriendRequests] = React.useState(false);
    const [openSentFriendRequests, setOpenSentFriendRequests] = React.useState(false);

    const loading = getAllUsers.loading || allFriendRequests.loading || allSentFriendRequests.loading;

    const errors = getAllUsers.error || allSentFriendRequests.error || allSentFriendRequests.error;

    if (loading) {
        return <div>Loading...</div>
    }

    const allUsers = getAllUsers.data?.allUsers || [];
    const friendRequests = allFriendRequests.data?.friendRequests || [];
    const sentFriendRequests = allSentFriendRequests.data?.sentFriendRequests || [];
    const allFriends = getAllFriends.data?.userFriends || [];

    console.log(sentFriendRequests);

    const handleOpen = (e) => {
        setOpenSearch(true);
    }

    const handleClose = (e) => {
        setOpenSearch(false);
    }

    const handleOpenFriendRequests = (e) => {
        setOpenFriendRequests(true);
    }

    const handleCloseFriendRequests = (e) => {
        setOpenFriendRequests(false);
    }

    const handleOpenSentFriendRequests = (e) => {
        setOpenSentFriendRequests(true);
    }

    const handleCloseSentFriendRequests = (e) => {
        setOpenSentFriendRequests(false);
    }

    const handleAddNewFriend = async (e) => {
        e.preventDefault();
        const friendId = e.target.parentNode.id;
        console.log(friendId);
        console.log(userId);
        try {
            await addFriend({
                variables: {
                    userId: userId,
                    friend: friendId
                }
            })
        } catch (err) {
            console.log(err);
        }
        setOpenFriendRequests(false);
    }

    const handleDenyFriendRequest = async (e) => {
        e.preventDefault();
        console.log(e.target.parentNode.id);
        const friendId = e.target.parentNode.id;
        try {
            await denyFriendRequest({
                variables: {
                    userId: userId,
                    friend: friendId
                }
            })
        } catch (err) {
            console.log(err);
        }
        setOpenFriendRequests(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100%",
        maxWidth: "500px",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
    };
    
    return (
        <div className="right-shelf">
            <div className="search-users-div">
                <button className="search-users-btn" onClick={handleOpen}>Search Users</button>
                <Modal 
                    open={openSearch} 
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <UserSearchModal allUsers={allUsers}/>
                    </Box>
                </Modal>
            </div>
            <div className="community-div">
                <h3>Cactus Community</h3>
                <ul className="community-dropdown">
                    {allUsers.map((user, index) => (
                        <li key={`${user}-${index}`}>
                            <a href = {`/profile/${user._id}`}>
                                <button className="friend-chips">
                                    <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                    <p>{user.username}</p>
                                </button>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="all-friends-div">
                <h3>Friends</h3>
                <ul>
                    {allFriends.friends && allFriends.friends.map((user, index) => (
                        <li key={`${user}-${index}`}>
                            <a href = {`/profile/${user._id}`}>
                                <button className="friend-chips">
                                    <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                    <p>{user.username}</p>
                                </button>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="friend-requests-div">
                <button onClick={handleOpenFriendRequests} className='friend-request-chip'>
                    Friend Requests
                    <div>{friendRequests.friend_requests && friendRequests.friend_requests.length}</div>
                </button>
            </div>
            <div className="sent-requests-div">
                <button onClick={handleOpenSentFriendRequests} className='friend-request-chip'>
                    Sent Requests
                    <div>{sentFriendRequests.sent_friend_requests && sentFriendRequests.sent_friend_requests.length}</div>
                </button>
            </div>
            <Modal 
                open={openFriendRequests} 
                onClose={handleCloseFriendRequests}
            >
                <Box sx={style}>
                    <div className="modal-form" id="modal-friends">
                        <div className="modal-header">
                            <h3>Friend Requests</h3>
                        </div>
                        <ul className="modal-list">
                            {friendRequests.friend_requests.map((user, index) => (
                                <li className="modal-request" key={`${user}-${index}`}>
                                    <a href = {`/profile/${user._id}`}>
                                        <button className="friend-chips">
                                            <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                            <p>{user.username}</p>
                                        </button>
                                    </a>
                                    <div id={user._id}>
                                        <button onClick={handleAddNewFriend}>Accept</button>
                                        <button onClick={handleDenyFriendRequest}>Deny</button>
                                    </div>
                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    
                </Box>
            </Modal>
            <Modal 
                open={openSentFriendRequests} 
                onClose={handleCloseSentFriendRequests}
            >
                <Box sx={style}>
                <div className="modal-form" id="modal-friends">
                    <div className="modal-header">
                        <h3>Sent Friend Requests</h3>
                    </div>
                    <ul className="modal-list">
                        {sentFriendRequests.sent_friend_requests.map((user,index) => (
                            <li key={`${user}-${index}`}>
                                <a href = {`/profile/${user._id}`}>
                                    <button className="friend-chips">
                                        <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                        <p>{user.username}</p>
                                    </button>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ProfileFriends;