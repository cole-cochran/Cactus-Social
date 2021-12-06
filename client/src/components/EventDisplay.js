


// import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { EVENT_DETAILS } from '../utils/queries';
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



export default function EventDisplay() {
	// for when we get the routes going
	const { eventId } = useParams();

	const { loading, data } = useQuery(EVENT_DETAILS, {
		variables: {
			eventId: eventId
		}
	});

	const singleEvent = data?.event || {};

	if (!singleEvent) {
		return <h3>This event no longer exists!</h3>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	const event = {
		title: 'Post-Bootcamp Party',
		description:
			"Come party at Chuck's house to celebrate the end of bootcamp. Damien is making pizza for everyone!",
		start_date: 'December 10th, 2021',
		end_date: 'December 10th, 2021',
		start_time: '5:00 PM',
		end_time: '9:00 PM',
		owner: 'Damien',
		attendees: [ 'Chuck', 'Cole', 'Fox', 'Sue', 'Ethan', 'Jayla' ],
		category: 'Party',
		in_person: true,
		location: 'Austin, Texas',
		image:
			'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
		thread: 'UTA Bootcamp',
		// comments: [],
		date_created: '11/30/2021'
	};

	const styles = {
		card: {
			margin: '20px auto',
			textAlign: 'center'
		},
		chips: {
			margin: '25px',
			textAlign: 'center',
			justifyContent: 'center'
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

	return (
		<div>
			<Card style={styles.card} sx={{ maxWidth: 750 }}>
				<CardMedia component="img" height="345" image={event.image} alt={event.title} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{event.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{event.description}
					</Typography>
					{event.start_date === event.end_date ? (
						<Typography variant="body2" color="text.secondary">
							Event Date: {event.start_date}
							Event Time: {event.start_time} to {event.end_time}
						</Typography>
					) : (
						<div>
							<Typography variant="body2" color="text.secondary">
								Begins: {event.start_date} @ {event.start_time}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Ends: {event.end_date} @ {event.end_time}
							</Typography>
						</div>
					)}
					{event.in_person ? (
						<Stack style={styles.chips} direction="row" spacing={1}>
							<Chip label="In Person Event" variant="outlined" />
							<Chip label={event.category} variant="outlined" />
						</Stack>
					) : (
						<Stack style={styles.chips} direction="row" spacing={1}>
							<Chip label="Virtual Event" variant="outlined" />
							<Chip label={event.category} variant="outlined" />
						</Stack>
					)}
					{event.in_person ? (
						<Typography variant="body2" color="text.secondary">
							{event.location}
						</Typography>
					) : (
						<Typography variant="body2" color="text.secondary">
							<a href={event.location}>Line to virtual event</a>
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
						{event.attendees.map((attendee, index) => <AccountCircleIcon key={index} />)}
					</Box>
					<Typography variant="body2" color="text.secondary">
						Created on {event.date_created} by {event.owner} in the {event.thread} thread
					</Typography>
				</CardContent>
				<CardActions style={styles.links}>
					{/* Dynamically display "attend" or "leave" based on if user events list contains this event or if user is owner/attendee */}
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
