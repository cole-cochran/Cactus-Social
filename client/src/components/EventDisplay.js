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

// import AuthService from '../utils/auth';

export default function EventDisplay() {

	// TODO (eventDisplay) make this beautiful

	// TODO (eventDisplay) add functionality for event owner to update, remove, or invite others to the event

	// TODO (eventDisplay) allow others to attend, leave, comment on events as they please

	// TODO (eventDisplay) create modal for users to update, delete their own comments

	// for when we get the routes going
	const { eventId } = useParams();

	const { loading, data } = useQuery(EVENT_DETAILS, {
		variables: {
			eventId: eventId
		}
	});

	const singleEvent = data?.event || {};

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

	if (!singleEvent) {
		return <h3>This event no longer exists!</h3>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Card style={styles.card} sx={{ maxWidth: 750 }}>
				<CardMedia component="img" height="345" image={singleEvent.image} alt={singleEvent.title} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{singleEvent.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{singleEvent.description}
					</Typography>
					{singleEvent.start_date === singleEvent.end_date ? (
						<Typography variant="body2" color="text.secondary">
							Event Date: {singleEvent.start_date}
							Event Time: {singleEvent.start_time} to {singleEvent.end_time}
						</Typography>
					) : (
						<div>
							<Typography variant="body2" color="text.secondary">
								Begins: {singleEvent.start_date} @ {singleEvent.start_time}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Ends: {singleEvent.end_date} @ {singleEvent.end_time}
							</Typography>
						</div>
					)}
					{singleEvent.in_person ? (
						<Stack style={styles.chips} direction="row" spacing={1}>
							<Chip label="In Person Event" variant="outlined" />
							<Chip label={singleEvent.category} variant="outlined" />
						</Stack>
					) : (
						<Stack style={styles.chips} direction="row" spacing={1}>
							<Chip label="Virtual Event" variant="outlined" />
							<Chip label={singleEvent.category} variant="outlined" />
						</Stack>
					)}
					{singleEvent.in_person ? (
						<Typography variant="body2" color="text.secondary">
							{singleEvent.location}
						</Typography>
					) : (
						<Typography variant="body2" color="text.secondary">
							<a href={singleEvent.location}>Link to virtual event</a>
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
						{singleEvent.attendees.map((attendee, index) => <AccountCircleIcon key={index} />)}
					</Box>
					<Typography variant="body2" color="text.secondary">
						Created on {singleEvent.date_created} by {singleEvent.owner} in the {singleEvent.thread} thread
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
