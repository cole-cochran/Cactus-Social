import React from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EventEditor from './EventEditor';

import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { EVENT_DETAILS, USER_PROFILE } from '../utils/queries';
// import { CREATE_EVENT_COMMENT, REMOVE_EVENT_COMMENT, UPDATE_EVENT_COMMENT, ADD_EVENT_COMMENT_REACTION } from '../utils/mutations';
import { REMOVE_EVENT, ATTEND_EVENT, LEAVE_EVENT } from '../utils/mutations';
//! ADD  DESCRIPTION OF EVENT_DETAILS

import AuthService from '../utils/auth';

export default function EventDisplay() {

	const userId = AuthService.getProfile().data._id;

	// TODO (eventDisplay) add functionality for event owner to update, remove, or invite others to the event

	// TODO (eventDisplay) allow others to attend, leave, comment on events as they please

	// TODO (eventDisplay) create modal for users to update, delete their own comments

	const { eventId } = useParams();

	const [openEditor, setOpenEditor] = React.useState(false);

	const singleEvent = useQuery(EVENT_DETAILS, {
		variables: { eventId: eventId }
	});

	const singleUser = useQuery(USER_PROFILE, {
		variables: { userId: AuthService.getProfile().data._id }
	})

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

	//* If the logged in user is event owner, let them update or delete the event

	//* Otherwise, let the user attend or leave the event
	
	const errors = singleEvent.error || singleUser.error;
	const loading = singleEvent.loading || singleUser.loading;

	if (loading) {
		return <div>Loading...</div>;
	}

	if (errors) {
		return <div>ERROR: {errors}</div>
	}

	if (!singleEvent.data.eventDetails) {
		return <h3>This event no longer exists!</h3>;
	}

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

	const handleDropdown = async (event) => {
		const content = event.target.parentNode.parentNode.childNodes[1];

		content.style.display = "flex";
	}

	const handleCloseDropdown = (event) => {
		if (event.target.className !== "dropdown-content" && event.target.className !== "dropdown-option" && event.target.className !== "dots") {
			const content = document.querySelector('.dropdown-content');
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

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24
	};

	return (
		<div onClick={handleCloseDropdown}>
			<NavBar userId={userId} />
            <div className="app-content-container" >
				<Sidebar />
				<div className='event-container'>
					<div className='event-card'>
						<div className='event-main-div'>
							<img className='event-img' src="../../assets/img/camping_trip.png" alt="event icon" />
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
							</div>
							<div className='event-option-div'>
								{eventData.in_person ? (
									<div className='event-inperson'>
										<img src="../../assets/img/place_marker.svg" alt="place marker"/>
										<p>In-Person</p>
									</div>
								) : (
									<div className='event-inperson'>
										<img src="../../assets/img/laptop.svg" alt="laptop"/>
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
									<div className="dropdown">
										<div className='event-more'>
											<img className="dots" src="../../assets/img/dotdotdot.svg" alt="pin" onClick={handleDropdown}/>
											<p>More</p>
										</div>
									<div className="dropdown-content">
										<div className="dropdown-option" onClick={handleOpenEditor}>
											Update
										</div>
										<div onClick={handleDelete} >
											Delete
										</div>
									</div>
								</div>
								}
								
							</div>
						</div>
						<div className='event-desc-div'>
							<p className='event-description'><span>Description: </span>{eventData.description}</p>
							{eventData.start_date === eventData.end_date ? (
								<div className='event-datetime'>
								<p>
									<span>Event Date: </span>{eventData.start_date}
								</p>
								<p>
									<span>Event Time: </span>{eventData.start_time} to {eventData.end_time}
								</p>
								</div>
							) : (
								<div className='event-datetime'>
									<p>
										<span>Begins: </span>
										{eventData.start_date} @ {eventData.start_time}
									</p>
									<p>
										<span>Ends: </span>{eventData.end_date} @ {eventData.end_time}
									</p>
								</div>
							)}
						</div>
						<div className='event-other-div'>
							{eventData.in_person ? (
								<p className='event-location'><span>Location: </span>
									{eventData.location}
								</p>
							) : (
								<a className='event-virtual' href={eventData.location}>Link To Virtual Event</a>
							)}

							<div className='event-attendees'>
								<h5>
									Attendees:
								</h5>
								<div className='event-attendees-div'>
								{eventData.attendees.map((attendee) => (
									<div className='event-attendee' key={attendee._id}>
										<img src="../../assets/img/test_account.png" alt="user profile pic"/>
										<p>{attendee.username}</p>
									</div>
									)
								)}
								</div>
							</div>
							<div className='event-creation-info'>
								<p>
									Created on {eventData.date_created} by {eventData.owner.username}
								</p>
							</div>
						</div>
						<div className='event-actions'>
							<button>
								Contact Host
							</button>
							{/* when see comments button is pressed, render the event comments component with the eventId passes into it as a prop */}
							{/* if the comments are shown show new button that allows users to hide comments -- need a piece of state to track opening and closing status */}
							<button>
								See Comments
							</button>
							{/* <button>
								Hide Comments
							</button> */}
						</div>
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
							<EventEditor eventId={eventId} eventData={eventData} />
						</Box>
					</Modal>
			</div>
			<Footer/>
		</div>
	);
}
