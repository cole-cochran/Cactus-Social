import React from "react";

import { useMutation, useQuery } from '@apollo/client';
import { USER_FRIENDS, SENT_INVITES } from '../utils/queries';
import { SEND_THREAD_INVITE } from '../utils/mutations';
import AuthService from '../utils/auth';

export default function InvitationModal(props) {

    const { threadId, handleCloseInvite } = props;

    const userId = AuthService.getProfile().data._id;

    const [ sendThreadInvite ] = useMutation(SEND_THREAD_INVITE, {
		refetchQueries: [
			SENT_INVITES,
			"sentInvites"
		]
	})

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

    const handleSendThreadInvite = async (event) => {
        event.preventDefault();
        const receiver = event.target.parentNode.parentNode.parentNode.id;
        try {
            await sendThreadInvite({
                variables: {
                    sender: userId,
                    receiver: receiver,
                    threadId: threadId
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const threadInvites = allSentInvites.sent_invites.filter((invite) => (
        invite.thread._id === threadId
    ));

    console.log(threadInvites)

    const uninvitedFriends = allFriends.friends.filter((friend) => {
        for (let invitation of threadInvites) {
            console.log(invitation);
            if (invitation.user._id === friend._id) {
                return null;
            }
        }
        return friend;
    })

    console.log(uninvitedFriends);

    return (
        <div className="modal-form" id="modal-friends">
            <div className="exit-modal-box" onClick={handleCloseInvite}>
                <img className="exit-modal" src="../../assets/img/exit_icon.svg" alt="exit"/>
            </div>
            
            <div className="all-friends-div">
                <ul className="modal-list">
                    {uninvitedFriends && uninvitedFriends.map((user, index) => (
                        <li key={`${user}-${index}`} id={user._id}>
                            <a href = {`/profile/${user._id}`}>
                                <button 
                                className="friend-chips"
                                onClick={handleSendThreadInvite}
                                >
                                    <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                    <p>{user.username}</p>
                                </button>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};