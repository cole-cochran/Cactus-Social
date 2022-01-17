import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { EVENT_DETAILS } from '../utils/queries';
// import { REMOVE_EVENT, UPDATE_EVENT, ATTEND_EVENT, LEAVE_EVENT, CREATE_EVENT_COMMENT, REMOVE_EVENT_COMMENT, UPDATE_EVENT_COMMENT, ADD_EVENT_COMMENT_REACTION } from '../utils/mutations';

//! ADD  DESCRIPTION OF EVENT_DETAILS

import AuthService from '../utils/auth';

export default function EventDisplay() {

	// TODO (eventDisplay) make this beautiful

	// TODO (eventDisplay) add functionality for event owner to update, remove, or invite others to the event

	// TODO (eventDisplay) allow others to attend, leave, comment on events as they please

	// TODO (eventDisplay) create modal for users to update, delete their own comments

	// for when we get the routes going
	const { eventId } = useParams();
	console.log(eventId)

	const singleEvent = useQuery(EVENT_DETAILS, {
		variables: { eventId: eventId }
	});
	
	const errors = singleEvent.error;
	const loading = singleEvent.loading;

	const styles = {
		card: {
			margin: '20px auto',
			textAlign: 'center'
		},
		chips: {
			margin: '25px',
			textAlign: 'center',
			justifyContent: 'center',
		},
		links: {
			margin: '20px',
			textAlign: 'center',
			justifyContent: 'center'
		},
		box: {
			margin: '30px'
		},
		button: {
			marginBottom: '10px'
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!singleEvent.data.eventDetails) {
		return <h3>This event no longer exists!</h3>;
	}

	console.log(singleEvent.data.eventDetails)

	const eventData = singleEvent.data.eventDetails;

	return (
		<div className='event-container'>
			<Card style={styles.card} sx={{ maxWidth: 750 }}>
				{/* <div className='event-card'></div> */}
				<div>
					<img className='event-img' src="../../assets/img/camping_trip.png" alt="event icon" />
					<h2 className='event-title'>{eventData.title}</h2>
					<h5 className='event-host'>Host: {eventData.owner.username}</h5>
				</div>
				<div>
					<p className='event-description'>{eventData.description}</p>
					<div className='event-datetime'>

					</div>
				</div>

				<CardContent>
						
					</Typography>
					{eventData.start_date === eventData.end_date ? (
						<Typography variant="body2" color="text.secondary">
							Event Date: {eventData.start_date}
							Event Time: {eventData.start_time} to {eventData.end_time}
						</Typography>
					) : (
						<div>
							<Typography variant="body2" color="text.secondary">
								Begins: {eventData.start_date} @ {eventData.start_time}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Ends: {eventData.end_date} @ {eventData.end_time}
							</Typography>
						</div>
					)}
					{eventData.in_person ? (
						<Stack style={styles.chips} direction="row" spacing={1}>
							<Chip label="In Person Event" variant="outlined" />
							<Chip label={eventData.category} variant="outlined" />
						</Stack>
					) : (
						<Stack style={styles.chips} direction="row" spacing={1}>
							<Chip label="Virtual Event" variant="outlined" />
							<Chip label={eventData.category} variant="outlined" />
						</Stack>
					)}
					{eventData.in_person ? (
						<Typography variant="body2" color="text.secondary">
							{eventData.location}
						</Typography>
					) : (
						<Typography variant="body2" color="text.secondary">
							<a href={eventData.location}>Link to virtual event</a>
						</Typography>
					)}
					{/* <AvatarGroup max={4}> */}
					{/* <Avatar alt={event.attendees[0]} src="/static/images/avatar/1.jpg" /> */}
					{/* </AvatarGroup> */}
					<Box
						style={styles.box}
						sx={{
							'& > :not(style)': {
								m: 1
							}
						}}
					>
						<Typography variant="body2" color="text.secondary">
							Attendees:
						</Typography>
						{eventData.attendees.map((attendee) => (
							<div>
								<AccountCircleIcon key={attendee._id} />
								<p>{attendee.username}</p>
							</div>
							)
						)}
					</Box>
					<Typography variant="body2" color="text.secondary">
						Created on {eventData.date_created} by {eventData.owner.username} in the {eventData.thread.title} thread
					</Typography>
				</CardContent>
				<CardActions style={styles.links}>
					{/* Dynamically display "attend" or "leave" based on if user events list contains this event or if user is attendee */}
					<Button style={styles.button} variant="contained" size="small">
						Attend Event
					</Button>
					{/* DO WE WANT TO POP OUT COMMENT WHEN CLICKED OR HAVE THAT OPTION ALREADY PRESENT ? */}
					<Button style={styles.button} variant="contained" size="small">
						See Comments
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}
