import React from "react";
import { CloudinaryContext, Image } from 'cloudinary-react';
import UserChip from "../UserChip";

export function UserInvitations(props) {
    const {eventInvitations, handleAcceptInvite, handleRejectInvite, threadInvitations} = props;
    return (
        <div className="modal-form" id="modal-friends">
            <div className="modal-header">
                <h3>Invitations</h3>
            </div>
            <ul className="modal-list invite-modal-list">
                <div className="modal-title">Events:</div>
                {eventInvitations.map((invite)=> (
                    <li id={invite.event._id} key={`${invite._id}`} className="modal-list-item invite-modal-item">
                        <div className="modal-left-top">
                            <UserChip user={invite.user}/>
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
                <div className="modal-title">Threads:</div>
                {threadInvitations.map((invite)=> (
                    <li id={invite.thread._id} key={`${invite._id}`} className="modal-list-item invite-modal-item">
                        <div className="modal-left-top">
                            <button className="friend-chips">
                                {invite.user.picture === "" ? (
                                <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                                ) : (
                                <CloudinaryContext style={{display: "block"}} cloudName="damienluzzo" >
                                    <Image className="friend-pic" publicId={`CactusSocial/${invite.user.picture}.${invite.user.picture_type}`} />
                                </CloudinaryContext>
                                )}
                                
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
    )
}

export function SentRequests(props) {
    const {sentFriendRequests} = props;
    return (
        <div className="modal-form" id="modal-friends">
            <div className="modal-header">
                <h3>Sent Friend Requests</h3>
            </div>
            <ul className="modal-list">
                {sentFriendRequests.sent_friend_requests.map((user,index) => (
                    <li key={`${user}-${index}`}>
                        <a href = {`/profile/${user._id}`}>
                            <UserChip user={user}/>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function FriendRequests(props) {
    const {friendRequests, handleAddNewFriend, handleDenyFriendRequest} = props;
    return (
        <div className="modal-form" id="modal-friends">
            <div className="modal-header">
                <h3>Friend Requests</h3>
            </div>
            <ul className="modal-list">
                {friendRequests.friend_requests.map((user, index) => (
                    <li className="modal-request" key={`${user}-${index}`}>
                        <a href = {`/profile/${user._id}`}>
                            <UserChip user={user}/>
                        </a>
                        <div id={user._id}>
                            <button onClick={handleAddNewFriend}>Accept</button>
                            <button onClick={handleDenyFriendRequest}>Deny</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function ChooseChatMembers(props) {
    const {chatMembers, handleRemoveChatMember, nonChatFriends, handleAddChatMember, handleClose, handleCreateNewChat} = props;
    return (
        <div className="chat-create-div">
            <div className="chat-create-main">
                <h2>Who Do You Want To Chat With?</h2>
                <div className="selected-chat-friends">
                    <h3>Chosen Friends</h3>
                    <ul>
                        {chatMembers &&
                            chatMembers.map((user, index) => (
                                <li key={`${user}-${index}`}>
                                    <button
                                        style={{
                                            cursor: 'default',
                                        }}
                                        className="friend-chips"
                                    >
                                        <img
                                            className="friend-pic"
                                            src="../../assets/img/github.svg"
                                            alt="friend avatar"
                                        />
                                        <p>{user.username}</p>
                                        <img
                                            src="../../assets/img/exit_icon.svg"
                                            alt="open check box"
                                            style={{
                                                height: '20px',
                                                marginLeft: '15px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={
                                                handleRemoveChatMember
                                            }
                                            id={user._id}
                                        />
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="all-friends-div">
                    <h3>Friends</h3>
                    <ul>
                        {nonChatFriends &&
                            nonChatFriends.map((user, index) => (
                                <li key={`${user}-${index}`}>
                                    <button
                                        style={{
                                            cursor: 'default',
                                        }}
                                        className="friend-chips"
                                    >
                                        <img
                                            className="friend-pic"
                                            src="../../assets/img/github.svg"
                                            alt="friend avatar"
                                        />
                                        <p>{user.username}</p>
                                        <img
                                            src="../../assets/img/open-circle.svg"
                                            alt="open check box"
                                            style={{
                                                height: '20px',
                                                marginLeft: '15px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={
                                                handleAddChatMember
                                            }
                                            id={user._id}
                                        />
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div className="chat-create-actions">
                <button
                    className="cancel-button"
                    onClick={handleClose}
                >
                    Cancel
                </button>
                <button
                    className="create-button"
                    onClick={handleCreateNewChat}
                    disabled={
                        chatMembers.length === 0 ? true : false
                    }
                >
                    Create Chat
                </button>
            </div>
        </div>
    )
}

export function UpdateProjectModal(props) {
    const {handleChange, handleUpdateProject, editedProject, handleDeleteProject} = props;
    return (
        <form id="userProject" className="modal-form" onSubmit={handleUpdateProject}>
            <div className="modal-header">
                <h3>Update Project</h3>
            </div>
            <div>
                <label htmlFor="title" >Title</label>
                <input id="title" name='title' value={editedProject.title} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={editedProject.description} onChange={handleChange} className="modal-textarea" />
            </div>
            <div>
                <label htmlfor="addImage">Image</label>
                <input type="file" id="addImage" name="addImage" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="responsibilities">Responsibilities</label>
                <textarea id="responsibilities" name="responsibilities" value={editedProject.responsibilities} onChange={handleChange} className="modal-textarea" />
            </div>
            <div>
                <label htmlFor="techstack">Tech Stack</label>
                <textarea id="techstack" name="techstack" value={editedProject.techstack} onChange={handleChange} className="modal-textarea" />
            </div>
            <div>
                <label htmlFor="repo" >Repo Link</label>
                <input id="repo" name='repo' value={editedProject.repo} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="repo" >Live/Demo Link</label>
                <input id="repo" name='repo' value={editedProject.repo} onChange={handleChange}/>
            </div>
            <div className="modal-button-div">
                <button className="modal-button" type="submit">
                    Update
                </button>
                <button className="modal-button delete-button" onClick={handleDeleteProject}>
                    Delete
                </button>
            </div>
        </form>
    )
}

export function CreateProjectModal(props) {
    const {handleCreateProject, createdProject, handleProjectChange, } = props;

    return (
        <form id="userProject" className="modal-form modal-project" onSubmit={handleCreateProject}>
            <div className="modal-header">
                <h3>Create Project</h3>
            </div>
            <div>
                <label htmlFor="title" >Title</label>
                <input id="title" name='title' value={createdProject.title} onChange={handleProjectChange}/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={createdProject.description} onChange={handleProjectChange} className="modal-textarea" />
            </div>
            <div>
                <label htmlfor="addImage">Image</label>
                <input type="file" id="addImage" name="addImage" onChange={handleProjectChange} />
            </div>
            <div>
                <label htmlFor="responsibilities">Responsibilities</label>
                <textarea id="responsibilities" name="responsibilities" value={createdProject.responsibilities} onChange={handleProjectChange} className="modal-textarea" />
            </div>
            <div>
                <label htmlFor="techstack">Tech Stack</label>
                <textarea id="techstack" name="techstack" value={createdProject.techstack} onChange={handleProjectChange} className="modal-textarea" />
            </div>
            <div>
                <label htmlFor="repo" >Repo Link</label>
                <input id="repo" name='repo' value={createdProject.repo} onChange={handleProjectChange}/>
            </div>
            <div>
                <label htmlFor="demo" >Live/Demo Link</label>
                <input id="demo" name='demo' value={createdProject.demo} onChange={handleProjectChange}/>
            </div>
            <button className="modal-button" type="submit">
                Create
            </button>
        </form>
    )
}
