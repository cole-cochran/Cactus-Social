import React from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UserSearchModal from './UserSearchModal';
// import {Link} from 'react-router-dom';

import { ALL_USERS, FRIEND_REQUESTS, RECEIVED_INVITES, SENT_FRIEND_REQUESTS, USER_FRIENDS } from '../utils/queries';
import { ADD_FRIEND, DENY_FRIEND_REQUEST, ACCEPT_EVENT_INVITE, ACCEPT_THREAD_INVITE, REJECT_EVENT_INVITE, REJECT_THREAD_INVITE } from '../utils/mutations';

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
    const getAllInvites = useQuery(RECEIVED_INVITES, {
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

    const [ acceptThreadInvite ] = useMutation(ACCEPT_THREAD_INVITE, {
        refetchQueries: [
            RECEIVED_INVITES,
            "receivedInvites"
        ]
    });

    const [ rejectThreadInvite ] = useMutation(REJECT_THREAD_INVITE, {
        refetchQueries: [
            RECEIVED_INVITES,
            "receivedInvites"
        ]
    });

    const [ acceptEventInvite ] = useMutation(ACCEPT_EVENT_INVITE, {
        refetchQueries: [
            RECEIVED_INVITES,
            "receivedInvites"
        ]
    });

    const [ rejectEventInvite ] = useMutation(REJECT_EVENT_INVITE, {
        refetchQueries: [
            RECEIVED_INVITES,
            "receivedInvites"
        ]
    });

    // const friendsQuery = useQuery(USER_FRIENDS);
    const [openSearch, setOpenSearch] = React.useState(false);
    const [openFriendRequests, setOpenFriendRequests] = React.useState(false);
    const [openSentFriendRequests, setOpenSentFriendRequests] = React.useState(false);
    const [ openInvitations, setOpenInvitations] = React.useState(false);

    const loading = getAllUsers.loading || allFriendRequests.loading || allSentFriendRequests.loading || getAllInvites.loading;

    const errors = getAllUsers.error || allSentFriendRequests.error || allSentFriendRequests.error || getAllInvites.error;

    if (loading) {
        return <div>Loading...</div>
    }

    const allUsers = getAllUsers.data?.allUsers || [];
    const friendRequests = allFriendRequests.data?.friendRequests || [];
    const sentFriendRequests = allSentFriendRequests.data?.sentFriendRequests || [];
    const allFriends = getAllFriends.data?.userFriends || [];
    const allInvitations = getAllInvites.data?.receivedInvites || [];

    console.log(allInvitations.received_invites);

    let eventInvitations = [];
    let threadInvitations = [];

    for (let invite of allInvitations.received_invites) {
        if (invite.event) {
            eventInvitations.push(invite);
        } else if (invite.thread) {
            threadInvitations.push(invite);
        }
    }

    const handleOpen = (e) => {
        setOpenSearch(true);
    }

    const handleClose = (e) => {
        setOpenSearch(false);
    }

    const handleOpenInvitations = async () => {
        setOpenInvitations(true);
    }

    const handleCloseInvitations = async () => {
        setOpenInvitations(false);
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

    const handleAcceptInvite = async (event) => {
        event.preventDefault();
        console.log(event.target.dataset);
        const data = event.target.dataset;
        const senderId = data.user;
        
        if (data.name === "event") {
            let eventId = data.id;
            try {
                await acceptEventInvite({
                    variables: {
                        senderId: senderId,
                        eventId: eventId,
                        userId: userId
                    }
                })
            } catch(err) {
                console.log(err);
            }
        } else if (data.name === "thread") {
            let threadId = data.id;
            try {
                await acceptThreadInvite({
                    variables: {
                        senderId: senderId,
                        threadId: threadId,
                        userId: userId
                    }
                })
            } catch(err) {
                console.log(err);
            }
        }

    }

    const handleRejectInvite = async (event) => {
        event.preventDefault();
        console.log(event.target);
        const data = event.target.dataset;
        const senderId = data.user;
        
        if (data.name === "event") {
            let eventId = data.id;
            try {
                await rejectEventInvite({
                    variables: {
                        senderId: senderId,
                        eventId: eventId,
                        userId: userId
                    }
                })
            } catch(err) {
                console.log(err);
            }
        } else if (data.name === "thread") {
            let threadId = data.id;
            try {
                await rejectThreadInvite({
                    variables: {
                        senderId: senderId,
                        threadId: threadId,
                        userId: userId
                    }
                })
            } catch(err) {
                console.log(err);
            }
        }
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

    const toggleRightShelf = (e) => {
        const rightShelf = document.querySelector(".right-shelf");
        const profileWrapper = document.querySelector(".profile-wrapper");

        if (rightShelf.getAttribute("data-id") === "closed") {
            for (let i = 1; i < rightShelf.childNodes.length; i++) {
                rightShelf.childNodes[i].style.display = "block"
            }
            rightShelf.setAttribute("data-id", "opened");
            rightShelf.style.width = "16rem";
            rightShelf.style.minWidth = "16rem";
            profileWrapper.style.width = "calc(100vw - 304px)";
            rightShelf.style.paddingLeft = "1rem";
        } else {
            for (let i = 1; i < rightShelf.childNodes.length; i++) {
                rightShelf.childNodes[i].style.display = "none"
            }
            rightShelf.setAttribute("data-id", "closed");
            rightShelf.style.width = "4.5rem"
            rightShelf.style.minWidth = "4.5rem"
            profileWrapper.style.width = "calc(100vw - 128px)";
            rightShelf.style.paddingLeft = "0rem";
        }
        
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
        <div data-id="closed" className="right-shelf">
            <img onClick={toggleRightShelf} id="friends-bar-toggle" style={{width: "60px", margin: "10px 10px", cursor: "pointer"}} src="../../assets/img/new_cacti_icon.svg" alt="friends toggle"/>
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
            <div className="invites-received-div">
                <button onClick={handleOpenInvitations} className="friend-request-chip">
                    Invitations
                    <div>
                        {allInvitations.received_invites.length}
                    </div>
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
            <Modal 
                open={openInvitations} 
                onClose={handleCloseInvitations}
            >
                <Box sx={style}>
                <div className="modal-form" id="modal-friends">
                    <div className="modal-header">
                        <h3>Invitations</h3>
                    </div>
                        <ul className="modal-list invite-modal-list">
                            <div className="modal-title">Events:</div>
                            {eventInvitations.map((invite)=> (
                                <li id={invite.event._id} key={`${invite._id}`} className="modal-list-item invite-modal-item">
                                    <div className="modal-left-top">
                                    <button className="friend-chips">
                                        <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                        <p> {invite.user.username} </p>
                                    </button>
                                    <div className="modal-list-text">
                                        <p> Invited You To Attend </p>
                                    </div>
                                    <div>
                                        <a href={`/events/${invite.event._id}`}>
                                            <button className="friend-chips">
                                                <img src="../../assets/img/cactus_event.png" style={{width: "30px", height: "30px", marginRight: "15px"}} alt="event icon" />
                                                <p>{invite.event.title}</p>
                                            </button>
                                        </a>
                                    </div>
                                    </div>
                                    <div className="modal-right-bottom">
                                        <button 
                                        className="accept-button"
                                        onClick={handleAcceptInvite}
                                        data-name="event"
                                        data-id={invite.event._id}
                                        data-user={invite.user._id}
                                        >
                                            Accept
                                        </button>
                                        <button 
                                        className="reject-button"
                                        onClick={handleRejectInvite}
                                        data-name="event"
                                        data-id={invite.event._id}
                                        data-user={invite.user._id}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul> 
                        <ul className="modal-list invite-modal-list">
                            {/* //! May need to update resolvers to handle the population of more event and thread data to display */}
                            <div className="modal-title">Threads:</div>
                            {threadInvitations.map((invite)=> (
                                <li id={invite.thread._id} key={`${invite._id}`} className="modal-list-item invite-modal-item">
                                    <div className="modal-left-top">
                                        <button className="friend-chips">
                                            <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                            <p> {invite.user.username} </p>
                                        </button>
                                        <div className="modal-list-text">
                                            <p> Invited You To Join </p>
                                        </div>
                                        <div>
                                        <a href={`/threads/${invite.thread._id}`}>
                                            <button className="friend-chips">
                                                <img src="../../assets/img/cactus_threads_icon.png" style={{width: "30px", height: "15px", marginRight: "15px"}} alt="event icon" />
                                                <p> {invite.thread.title}</p>
                                            </button>
                                        </a>
                                        </div>
                                    </div>
                                    <div className="modal-right-bottom">
                                    <button 
                                        className="accept-button"
                                        onClick={handleAcceptInvite}
                                        data-name="thread"
                                        data-id={invite.thread._id}
                                        data-user={invite.user._id}
                                        >
                                            Accept
                                        </button>
                                        <button 
                                        className="reject-button"
                                        onClick={handleRejectInvite}
                                        data-name="thread"
                                        data-id={invite.thread._id}
                                        data-user={invite.user._id}
                                        >
                                            Reject
                                        </button>
                                    </div>
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