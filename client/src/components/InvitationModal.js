import React from "react";

import { useMutation, useQuery } from '@apollo/client';
import { USER_FRIENDS, SENT_INVITES } from '../utils/queries';
import { SEND_THREAD_INVITE, SEND_EVENT_INVITE } from '../utils/mutations';
import AuthService from '../utils/auth';

export default function InvitationModal(props) {

    const { itemId, itemType, handleCloseInvite } = props;

    const userId = AuthService.getProfile().data._id;

    const [ sendThreadInvite ] = useMutation(SEND_THREAD_INVITE, {
		refetchQueries: [
			SENT_INVITES,
			"sentInvites"
		]
	});

    const [ sendEventInvite ] = useMutation(SEND_EVENT_INVITE, {
        refetchQueries: [
            SENT_INVITES,
            "sentInvites"
        ]
    });

    const getAllFriends = useQuery(USER_FRIENDS, {
        variables: {
            userId: userId
        }
    });

    const getAllInvites = useQuery(SENT_INVITES, {
		variables: { 
            userId: userId 
        }
	});

    const errors = getAllInvites.error || getAllFriends.error;
    const loading = getAllInvites.loading || getAllFriends.loading;

    if (loading) {
        return <div>Loading...</div>
    }

    const allFriends = getAllFriends.data?.userFriends || [];
    const allSentInvites = getAllInvites.data?.sentInvites || {};

    console.log(allSentInvites.sent_invites);

    const handleSendInvite = async (event) => {
        event.preventDefault();
        const receiver = event.target.parentNode.parentNode.parentNode.id;
        if (itemType === "thread") {
            try {
                await sendThreadInvite({
                    variables: {
                        sender: userId,
                        receiver: receiver,
                        threadId: itemId
                    }
                })
            } catch (err) {
                console.log(err);
            }
        } else if ( itemType === "event") {
            try {
                await sendEventInvite({
                    variables: {
                        sender: userId,
                        receiver: receiver,
                        eventId: itemId
                    }
                })
            } catch (err) {
                console.log(err);
            }
        }
        
    }

    const threadInvites = allSentInvites.sent_invites.filter((invite) => {
        if (invite.thread) {
            return invite.thread._id === itemId
        }
        return null;
    });

    console.log(threadInvites)

    const eventInvites = allSentInvites.sent_invites.filter((invite) => {
        if (invite.event) {
            return invite.event._id === itemId
        }
        return null;
    });

    console.log(eventInvites);

    const uninvitedThreadFriends = allFriends.friends.filter((friend) => {
        for (let invitation of threadInvites) {
            console.log(invitation);
            if (invitation.user._id === friend._id) {
                return null;
            }
        }
        return friend;
    });

    console.log(uninvitedThreadFriends);

    const uninvitedEventFriends = allFriends.friends.filter((friend) => {
        for (let invitation of eventInvites) {
            console.log(invitation);
            if (invitation.user._id === friend._id) {
                return null;
            }
        }
        return friend;
    });

    console.log(uninvitedEventFriends);

    return (
        <div className="modal-form" id="modal-friends">
            <div className="exit-modal-box" onClick={handleCloseInvite}>
                <img className="exit-modal" src="../../assets/img/exit_icon.svg" alt="exit"/>
            </div>
            
            <div className="all-friends-div">
                <ul className="modal-list">
                    {itemType === "thread" && uninvitedThreadFriends.length ? uninvitedThreadFriends.map((user, index) => (
                        <li key={`${user}-${index}`} id={user._id}>
                            <a href = {`/profile/${user._id}`}>
                                <button 
                                className="friend-chips"
                                onClick={handleSendInvite}
                                >
                                    <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                    <p>{user.username}</p>
                                </button>
                            </a>
                        </li>
                    )) : <React.Fragment /> 
                    }
                    {itemType === "event" && uninvitedEventFriends.length ? uninvitedEventFriends.map((user, index) => (
                        <li key={`${user}-${index}`} id={user._id}>
                            <a href = {`/profile/${user._id}`}>
                                <button 
                                className="friend-chips"
                                onClick={handleSendInvite}
                                >
                                    <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                    <p>{user.username}</p>
                                </button>
                            </a>
                        </li>
                    )) : <React.Fragment />
                } 
                </ul>
            </div>
        </div>
    )
};