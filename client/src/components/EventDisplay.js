import React from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EventEditor from './EventEditor';
import EventComment from './EventComment';
import InvitationModal from "./InvitationModal";

import { CloudinaryContext, Image } from 'cloudinary-react';

import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { EVENT_DETAILS, USER_PROFILE } from '../utils/queries';
// import { ADD_EVENT_COMMENT_REACTION } from '../utils/mutations';
import { REMOVE_EVENT, ATTEND_EVENT, LEAVE_EVENT, CREATE_EVENT_COMMENT, REMOVE_EVENT_COMMENT, UPDATE_EVENT_COMMENT } from '../utils/mutations';
//! ADD  DESCRIPTION OF EVENT_DETAILS

import AuthService from '../utils/auth';

export default function EventDisplay(props) {

	const userId = AuthService.getProfile().data._id;
	const { eventId } = useParams();
	const { socket, activeEvent, setActiveThread, setActiveEvent } = props;

	const singleEvent = useQuery(EVENT_DETAILS, {
		variables: { eventId: eventId }
	});
	const singleUser = useQuery(USER_PROFILE, {
		variables: { userId: AuthService.getProfile().data._id }
	});

	const [ removeEvent ] = useMutation(REMOVE_EVENT, {
		refetchQueries: [
			EVENT_DETAILS,
			'eventDetails'
		]
	});
	const [ attendEvent ] = useMutation(ATTEND_EVENT, {
		refetchQueries: [
			EVENT_DETAILS,
			'eventDetails'
		]
	});
	const [ leaveEvent ] = useMutation(LEAVE_EVENT, {
		refetchQueries: [
			EVENT_DETAILS,
			'eventDetails'
		]
	});

	const [ createEventComment ] = useMutation(CREATE_EVENT_COMMENT);

	const [ removeEventComment ] = useMutation(REMOVE_EVENT_COMMENT, {
		refetchQueries: [
			EVENT_DETAILS,
			'eventDetails'
		]
	});

	const [ updateEventComment ] = useMutation(UPDATE_EVENT_COMMENT, {
		refetchQueries: [
			EVENT_DETAILS,
			'eventDetails'
		]
	});
	
	const errors = singleEvent.error || singleUser.error;
	const loading = singleEvent.loading || singleUser.loading;

	const [openEditor, setOpenEditor] = React.useState(false);
	const [openCommentEditor, setOpenCommentEditor] = React.useState(false);
	const [newCommentText, setNewCommentText] = React.useState("");
	const [editedComment, setEditedComment] = React.useState("");
	const [toggleComments, setToggleComments] = React.useState(false);
	const [commentsList, setCommentsList] = React.useState([]);
	const [messageTimeout, setMessageTimeout] = React.useState(false);
	const [openInvite, setOpenInvite] = React.useState(false);

	React.useEffect(() => {
		socket.emit("join_event", {room: eventId, user: AuthService.getProfile().data.username})
	}, [activeEvent]);

	React.useEffect(() => {
		socket.on('receive_comment', (data) => {
			// console.log(data);
			setCommentsList(commentsList => [...commentsList, data]);
		});
	}, [socket]);

	const handleOpenInvite = (event) => {
		setOpenInvite(true);
	}

	const handleCloseInvite = (event) => {
		setOpenInvite(false);
	}

	const handleAttend = async () => {
		await attendEvent({
			variables: {
				eventId: eventId,
				attendee: userId
			}
		})
	}

	const handleLeave = async () => {
		await leaveEvent({
			variables: {
				eventId: eventId,
				attendee: userId
			}
		})
	}

	const handleCreateComment = async (event) => {
		event.preventDefault();
		try {
			const commentData = await createEventComment({
				variables: {
					eventId: eventId, 
					comment_text: newCommentText, author: userId
				}
			});
			socket.emit('send_comment', {room: eventId, user: AuthService.getProfile().data.username, comment: commentData.data.createEventComment});
			setNewCommentText("");
			setMessageTimeout(true);
			setTimeout(() => {setMessageTimeout(false)});
		} catch (err) {
			console.error(err);
		}
		
	}

	const handleRemoveComment = async (event) => {
		const commentId = JSON.parse(localStorage.getItem('commentId'));
		try {
			await removeEventComment({
				variables: {
					eventId: eventId,
					commentId: commentId
				}
			})
		} catch (err) {
			console.error(err);
		}

		localStorage.removeItem('commentId');
	}

	const handleUpdateComment = async (event) => {
		event.preventDefault();
		const commentId = JSON.parse(localStorage.getItem('commentId'));
		try {
			await updateEventComment({
				variables: {
					eventId: eventId,
					commentId: commentId, 
					comment_text: editedComment
				}
			})
		} catch (err) {
			console.error(err);
		}
		setEditedComment("");
		localStorage.removeItem('commentId');
		setOpenCommentEditor(false);
	}

	const handleChange = async (event) => {
		
		const { name, value } = event.target;

		if (name === 'eventCommentText') {
			setNewCommentText(value);
		} else if (name === 'editedCommentText') {
			setEditedComment(value)
		}
	}

	const handleCommentDropdown = async (event) => {
		const commentId = event.target.parentNode.parentNode.parentNode.getAttribute('data-id');

		localStorage.setItem('commentId', JSON.stringify(commentId));

		event.target.parentNode.childNodes[1].style.display = "flex";
	}

	const handleOpenCommentEditor = async (event) => {
		const currentComment = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].textContent;
		setEditedComment(currentComment);
		setOpenCommentEditor(true);
	}

	const handleCloseCommentEditor = async (event) => {
		setOpenCommentEditor(false);
	}

	const handleDropdown = async (event) => {
		const content = event.target.parentNode.parentNode.childNodes[1].childNodes[0];
		// console.log(content);

		content.style.display = "flex";
	}

	const handleCloseDropdown = (event) => {
		if (event.target.className !== "event-dropdown-content" && event.target.className !== "dropdown-option" && event.target.className !== "dots") {
			const content = document.querySelector('.event-dropdown-content');
			content.style.display = "none";
		}
		
	}

	const handleOpenEditor = async () => {
		setOpenEditor(true);
	}

	const handleCloseEditor = async () => {
		setOpenEditor(false);
	}

	const handleDelete = async () => {
		await removeEvent({
			variables: {
				eventId: eventId,
				userId: userId
			}
		});

		window.location.replace(`/profile/${userId}`);
	}

	const handleToggleComments = async () => {
		setToggleComments(!toggleComments);
	}



	if (loading) {
		return <div>Loading...</div>
	}

	if (errors) {
		return <div>ERROR: {errors}</div>
	}

	if (!singleEvent.data.eventDetails) {
		return <h3>This event no longer exists!</h3>;
	}

	const eventComments = singleEvent.data.eventDetails.comments;

	const eventData = singleEvent.data.eventDetails;

	let attending = false;
	for (let user of eventData.attendees) {
		if (user._id === userId) {
			attending = true;
			break;
		}
	}

	let owner = false;
	if (eventData.owner._id === userId) {
		owner = true;
	}

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: '#232323',
		boxShadow: 24,
		border: '2px solid white'
	};

	const scroll = () => {
		var element = document.getElementsByClassName("event-comment");
		element[0].scrollTop = element[0].scrollHeight;
	}

	return (
		<div onClick={handleCloseDropdown}>
			<NavBar userId={userId} />
            <div className="app-content-container" >
				<Sidebar setActiveThread={setActiveThread} setActiveEvent={setActiveEvent}/>
				<div className='event-container'>
					<div className='event-card'>
						<div className='event-main-div'>
							<div className='event-img-div'>
								{eventData.image === "" ? (
								<img className='event-img' src="../../assets/img/cactus_event.png" alt="event icon" />
								) : (
								<CloudinaryContext cloudName="damienluzzo" >
									<Image className="event-img" publicId={`CactusSocial/${eventData.image}`} />
								</CloudinaryContext>
								// TODO:                   ${eventDate.image_type}
								)}
								
							</div>
							<div className="event-main-top">
							<div className='event-meta'>
								<div>
									<h2 className='event-title'>{eventData.title}</h2>
									<h5 className='event-host'>Host: {eventData.owner.username}</h5>
								</div>
								<div className='event-type'>
									<p>Event Type: </p>
									<button>
										{eventData.category}
									</button>
								</div>
								<div className='event-type'>
									{eventData.private ? (
										<p>Invite Only</p>
									):(
										<p>Public Event</p>
									)}
								</div>
							</div>
							<div className='event-secondary'>
								<div className='event-datetime'>
									<div className='event-start'>
										<div>
											<span>Start: </span>
										</div>
										<div>
											<p>{eventData.start_date}</p>
											<p>at {eventData.start_time}</p>
										</div>
									</div>
									<div className='event-end'>
										<div>
											<span>End: </span>
										</div>
										<div>
											<p>{eventData.start_date}</p>
											<p>at {eventData.end_time}</p>
										</div>
									</div>
								</div>
								<div className='event-option-div'>
									{eventData.in_person ? (
										<div className='event-inperson'>
											<img src="../../assets/img/place_marker.svg" alt="place marker"/>
											<p>In-Person</p>
										</div>
									) : (
										<div className='event-inperson'>
											<img src="../../assets/img/laptop.png" alt="laptop"/>
											<p>Virtual</p>
										</div>
									)}
									{!attending ? (
										<div className='event-attend'>
											<img src="../../assets/img/plus-sign.svg" alt="plus sign" onClick={handleAttend} />
											<p>Attend</p>
										</div>
									) : (
										<div className='event-attend'>
											<img src="../../assets/img/minus_sign.png" alt="minus sign" onClick={handleLeave} />
											<p>Leave</p>
										</div>
									)}
									{owner &&
										<div className='event-more'>
											<div>
												<img className="dots" src="../../assets/img/dotdotdot.svg" alt="pin" onClick={handleDropdown}/>
												<p>More</p>
											</div>
											<div className="dropdown">
											<div className="event-dropdown-content">
													<div className="dropdown-option" onClick={handleOpenInvite}>
														Invite Friends
													</div>
													<div className="dropdown-option event-update-option" onClick={handleOpenEditor}>
														Update
													</div>
													<div className='event-delete' onClick={handleDelete} >
														Delete
													</div>
												</div>
											</div>
										</div>
									}
								</div>
							</div>
							</div>
						</div>
						<div className="event-location-div">
								{eventData.in_person ? (
									<p className='event-location'><span>Location: </span>
										{eventData.location}
									</p>
								) : (
									<a className='event-virtual' href={eventData.location} rel="noreferrer" target="_blank">Link To Virtual Event</a>
								)}
							</div>
						<div className='event-desc-div'>
							<p className='event-description'><span>Description: </span>{eventData.description}</p>
						</div>
						<div className='event-other-div'>
							<div className='event-attendees'>
								<h5>
									Attendees
								</h5>
								<div className='event-attendees-div'>
								{eventData.attendees.map((attendee) => (
									<div className='event-attendee' key={attendee._id}>
										{attendee.picture === "" ? (
										<img src="../../assets/img/test_account.png" alt="user profile pic"/>
										) : (
										<CloudinaryContext cloudName="damienluzzo" >
											<Image className="friend-pic" publicId={`CactusSocial/${attendee.picture}`} />
										</CloudinaryContext>
										)}
										
										<p>{attendee.username}</p>
									</div>
									)
								)}
								</div>
							</div>
							{/* <div className='event-creation-info'>
								<p>
									Created on {eventData.date_created} by {eventData.owner.username}
								</p>
							</div> */}
						</div>
						<div className='event-actions'>
							{/* <button>
								Contact Host
							</button> */}
							{toggleComments ? (
								<button onClick={handleToggleComments}>
									Hide Comments
								</button>
							) : (
								<button onClick={handleToggleComments}>
									See Comments
								</button>
							)}		
						</div>
						{toggleComments ? (
							<div className='event-comment' onLoad={scroll}>
								{eventComments.map((comment) => (
									<EventComment comment={comment} handleCommentDropdown={handleCommentDropdown} handleOpenCommentEditor={handleOpenCommentEditor} handleRemoveComment={handleRemoveComment} key={comment._id}/>
								))}
								{commentsList.map((comment) => (
									<EventComment comment={comment} handleCommentDropdown={handleCommentDropdown} handleOpenCommentEditor={handleOpenCommentEditor} handleRemoveComment={handleRemoveComment} key={comment._id}/>
								))}
								<form onSubmit={handleCreateComment} className="chat-input event-comment-input">
									<input onChange={handleChange} name="eventCommentText" value={newCommentText} contentEditable autoComplete='off' />
									<div className="chat-input-buttons">
										<button type="submit" className="chat-input-send-button">
											send
										</button>
									</div>
									{messageTimeout && newCommentText ? <div style={{color: 'white'}}>You have to wait 2 seconds before sending another message</div> : <React.Fragment />}
								</form>
							</div>
						) : (
							<React.Fragment />
						)}
						
					</div>
				</div>
				<Modal
					data-id="editEvent"
					open={openEditor}
					onClose={handleCloseEditor}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<EventEditor handleCloseEditor={handleCloseEditor} eventId={eventId} eventData={eventData} />
					</Box>
				</Modal>
				<Modal
                        data-id="invite"
						open={openInvite}
						onClose={handleCloseInvite}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<InvitationModal itemId={eventId} itemType="event" handleCloseInvite={handleCloseInvite} />
						</Box>
					</Modal>
				<Modal
					data-id="editComment"
					open={openCommentEditor}
					onClose={handleCloseCommentEditor}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<form onSubmit={handleUpdateComment} className='edit-event-comment-form'>
							<div>
								<label htmlFor='editedCommentText'>Comment</label>
								<input 
									type="text"
									value={editedComment} 
									id="editedCommentText" 
									onChange={handleChange} 
									name="editedCommentText"
								/>
							</div>
							<button
								type="submit"
							>
								Update
							</button>
						</form>
					</Box>
				</Modal>
			</div>
			<Footer/>
		</div>
	);
}
