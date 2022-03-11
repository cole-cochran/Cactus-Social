import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import UserSearchModal from './UserSearchModal';
import { FriendRequests, SentRequests, UserInvitations } from './Modals/Modals';

import {
    ALL_USERS,
    FRIEND_REQUESTS,
    RECEIVED_INVITES,
    SENT_FRIEND_REQUESTS,
    USER_FRIENDS,
} from '../utils/queries';
import {
    ADD_FRIEND,
    DENY_FRIEND_REQUEST,
    ACCEPT_EVENT_INVITE,
    ACCEPT_THREAD_INVITE,
    REJECT_EVENT_INVITE,
    REJECT_THREAD_INVITE,
} from '../utils/mutations';

import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import { modalStyle } from '../utils/constants';
import UserChip from './UserChip';

function ProfileFriends() {

    const userId = AuthService.getProfile().data._id;

    const getAllUsers = useQuery(ALL_USERS);
    const allFriendRequests = useQuery(FRIEND_REQUESTS, {
        variables: {
            userId: userId,
        },
    });
    const allSentFriendRequests = useQuery(SENT_FRIEND_REQUESTS, {
        variables: {
            userId: userId,
        },
    });
    const getAllFriends = useQuery(USER_FRIENDS, {
        variables: {
            userId: userId,
        },
    });
    const getAllInvites = useQuery(RECEIVED_INVITES, {
        variables: {
            userId: userId,
        },
    });

    const [addFriend] = useMutation(ADD_FRIEND, {
        refetchQueries: [USER_FRIENDS, 'userFriends'],
    });

    const [denyFriendRequest] = useMutation(DENY_FRIEND_REQUEST, {
        refetchQueries: [FRIEND_REQUESTS, 'friendRequests'],
    });

    const [acceptThreadInvite] = useMutation(ACCEPT_THREAD_INVITE, {
        refetchQueries: [RECEIVED_INVITES, 'receivedInvites'],
    });

    const [rejectThreadInvite] = useMutation(REJECT_THREAD_INVITE, {
        refetchQueries: [RECEIVED_INVITES, 'receivedInvites'],
    });

    const [acceptEventInvite] = useMutation(ACCEPT_EVENT_INVITE, {
        refetchQueries: [RECEIVED_INVITES, 'receivedInvites'],
    });

    const [rejectEventInvite] = useMutation(REJECT_EVENT_INVITE, {
        refetchQueries: [RECEIVED_INVITES, 'receivedInvites'],
    });

    const [openSearch, setOpenSearch] = React.useState(false);
    const [openFriendRequests, setOpenFriendRequests] = React.useState(false);
    const [openSentFriendRequests, setOpenSentFriendRequests] =
        React.useState(false);
    const [openInvitations, setOpenInvitations] = React.useState(false);

    const loading =
        getAllUsers.loading ||
        allFriendRequests.loading ||
        allSentFriendRequests.loading ||
        getAllInvites.loading;

    const errors =
        getAllUsers.error ||
        allSentFriendRequests.error ||
        allSentFriendRequests.error ||
        getAllInvites.error;

    if (loading) {
        return <div>Loading...</div>;
    }

    const allUsers = getAllUsers.data?.allUsers || [];
    const friendRequests = allFriendRequests.data?.friendRequests || [];
    const sentFriendRequests =
        allSentFriendRequests.data?.sentFriendRequests || [];
    const allFriends = getAllFriends.data?.userFriends || [];
    const allInvitations = getAllInvites.data?.receivedInvites || [];

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
    };

    const handleClose = (e) => {
        setOpenSearch(false);
    };

    const handleOpenInvitations = async () => {
        setOpenInvitations(true);
    };

    const handleCloseInvitations = async () => {
        setOpenInvitations(false);
    };

    const handleOpenFriendRequests = (e) => {
        setOpenFriendRequests(true);
    };

    const handleCloseFriendRequests = (e) => {
        setOpenFriendRequests(false);
    };

    const handleOpenSentFriendRequests = (e) => {
        setOpenSentFriendRequests(true);
    };

    const handleCloseSentFriendRequests = (e) => {
        setOpenSentFriendRequests(false);
    };

    const handleAcceptInvite = async (event) => {
        event.preventDefault();
        const data = event.target.dataset;
        const senderId = data.user;

        if (data.name === 'event') {
            let eventId = data.id;
            try {
                await acceptEventInvite({
                    variables: {
                        senderId: senderId,
                        eventId: eventId,
                        userId: userId,
                    },
                });
            } catch (err) {
                console.log(err);
            }
        } else if (data.name === 'thread') {
            let threadId = data.id;
            try {
                await acceptThreadInvite({
                    variables: {
                        senderId: senderId,
                        threadId: threadId,
                        userId: userId,
                    },
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleRejectInvite = async (event) => {
        event.preventDefault();
        const data = event.target.dataset;
        const senderId = data.user;

        if (data.name === 'event') {
            let eventId = data.id;
            try {
                await rejectEventInvite({
                    variables: {
                        senderId: senderId,
                        eventId: eventId,
                        userId: userId,
                    },
                });
            } catch (err) {
                console.log(err);
            }
        } else if (data.name === 'thread') {
            let threadId = data.id;
            try {
                await rejectThreadInvite({
                    variables: {
                        senderId: senderId,
                        threadId: threadId,
                        userId: userId,
                    },
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleAddNewFriend = async (e) => {
        e.preventDefault();
        const friendId = e.target.parentNode.id;
        try {
            await addFriend({
                variables: {
                    userId: userId,
                    friend: friendId,
                },
            });
        } catch (err) {
            console.log(err);
        }
        setOpenFriendRequests(false);
    };

    const handleDenyFriendRequest = async (e) => {
        e.preventDefault();
        const friendId = e.target.parentNode.id;
        try {
            await denyFriendRequest({
                variables: {
                    userId: userId,
                    friend: friendId,
                },
            });
        } catch (err) {
            console.log(err);
        }
        setOpenFriendRequests(false);
    };

    const toggleRightShelf = (e) => {
        const rightShelf = document.querySelector('.right-shelf');
        const profileWrapper = document.querySelector('.profile-wrapper');
        const sidebar = document.querySelector('#sidebar');
        const aside = document.querySelector('#aside');
        const openArrowBtn = document.querySelector('#open-arrow-btn');

        if (rightShelf.getAttribute('data-id') === 'closed') {
            if (sidebar.getAttribute('data-sidebarDisplay') === 'visible') {
                sidebar.style.left = '-100%';
                sidebar.setAttribute('data-sidebardisplay', 'hidden');
                aside.style.minWidth = '3rem';
                openArrowBtn.style.transform = 'rotate(180deg)';
            }

            for (let i = 1; i < rightShelf.childNodes.length; i++) {
                rightShelf.childNodes[i].style.display = 'block';
            }
            rightShelf.setAttribute('data-id', 'opened');
            rightShelf.style.right = '0rem';
            profileWrapper.style.width = 'calc(100vw - 304px)';
            rightShelf.style.paddingLeft = '1rem';
        } else {
            for (let i = 1; i < rightShelf.childNodes.length; i++) {
                rightShelf.childNodes[i].style.display = 'none';
            }
            rightShelf.setAttribute('data-id', 'closed');
            rightShelf.style.right = '-11rem';
            profileWrapper.style.width = 'calc(100vw - 128px)';
            rightShelf.style.paddingLeft = '0rem';
        }
    };

    return (
        <div data-id="closed" className="right-shelf">
            <img
                onClick={toggleRightShelf}
                id="friends-bar-toggle"
                src="../../assets/img/new_cacti_icon.svg"
                alt="friends toggle"
            />
            <div className="search-users-div">
                <button className="search-users-btn" onClick={handleOpen}>
                    Search Users
                </button>
                <Modal open={openSearch} onClose={handleClose}>
                    <Box sx={modalStyle}>
                        <UserSearchModal allUsers={allUsers} />
                    </Box>
                </Modal>
            </div>
            <div className="community-div">
                <h3>Cactus Community</h3>
                <ul className="community-dropdown">
                    {allUsers.map((user, index) => (
                        <li key={`${user}-${index}`}>
                            <a href={`/profile/${user._id}`}>
                                <UserChip user={user} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="all-friends-div">
                <h3>Friends</h3>
                <ul>
                    {allFriends.friends &&
                        allFriends.friends.map((user, index) => (
                            <li key={`${user}-${index}`}>
                                <a href={`/profile/${user._id}`}>
                                    <UserChip user={user} />
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="friend-requests-div">
                <button
                    onClick={handleOpenFriendRequests}
                    className="friend-request-chip"
                >
                    Friend Requests
                    <div>
                        {friendRequests.friend_requests &&
                            friendRequests.friend_requests.length}
                    </div>
                </button>
            </div>
            <div className="sent-requests-div">
                <button
                    onClick={handleOpenSentFriendRequests}
                    className="friend-request-chip"
                >
                    Sent Requests
                    <div>
                        {sentFriendRequests.sent_friend_requests &&
                            sentFriendRequests.sent_friend_requests.length}
                    </div>
                </button>
            </div>
            <div className="invites-received-div">
                <button
                    onClick={handleOpenInvitations}
                    className="friend-request-chip"
                >
                    Invitations
                    <div>{allInvitations.received_invites.length}</div>
                </button>
            </div>
            <Modal
                open={openFriendRequests}
                onClose={handleCloseFriendRequests}
            >
                <Box sx={modalStyle}>
                    <FriendRequests
                        handleAddNewFriend={handleAddNewFriend}
                        friendRequests={friendRequests}
                        handleDenyFriendRequest={handleDenyFriendRequest}
                    />
                </Box>
            </Modal>
            <Modal
                open={openSentFriendRequests}
                onClose={handleCloseSentFriendRequests}
            >
                <Box sx={modalStyle}>
                    <SentRequests sentFriendRequests={sentFriendRequests} />
                </Box>
            </Modal>
            <Modal open={openInvitations} onClose={handleCloseInvitations}>
                <Box sx={modalStyle}>
                    <UserInvitations
                        handleAcceptInvite={handleAcceptInvite}
                        handleRejectInvite={handleRejectInvite}
                        eventInvitations={eventInvitations}
                        threadInvitations={threadInvitations}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default ProfileFriends;
