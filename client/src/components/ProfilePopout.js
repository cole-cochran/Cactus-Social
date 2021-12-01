// import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_EVENTS_AND_THREADS } from '../utils/queries';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ProfilePopout() {
	const { userId } = useParams();

	const { loading, data } = useQuery(USER_EVENTS_AND_THREADS, {
		variables: {
			userId: userId
		}
	});

	// const userEvents = data?.events || [];
	// const userThreads = data?.threads || [];

    const userEvents = [];

    const userThreads = [
        {
            title: 'Project 3 Ideas',
            moderator: 'damienluzzo33',
            members: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'damienluzzo33', 'foxrigney1' ],
            posts: ["post1", "post2", "post3", "post4"],
            events: ["event1", "event2"],
            date_created: "12/01/2021"
        },
        {
            title: 'Camping Trip',
            moderator: 'bikerCole234',
            members: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'damienluzzo33', 'foxrigney1' ],
            posts: ["post1", "post2", "post3", "post4", "post5", "post6"],
            events: ["event1", "event2", "event3"]
        }
    ]

	if (loading) {
		return <div>Loading...</div>;
	}

	const styles = {
		card: {
			display: 'flex',
			justifyContent: 'start',
			textAlign: 'center'
		},
		media: {},
		content: {},
		title: {},
		p: {},
		chips: {},
		info: {},
		box: {}
	};

	return (
		<div className="userPopOut">
			<div className="userEvents">
				{userEvents.length ? (
					userEvents.map((event) => (
						<div>
							<Card style={styles.card} sx={{ maxHeight: 250 }}>
								<CardMedia
									style={styles.media}
									component="img"
									height="200px"
									image={event.image}
									alt={event.title}
								/>
								<CardContent style={styles.content}>
									<h2 style={styles.title}>{event.title}</h2>
									<p style={styles.p}>
										Starts on {event.start_date} at {event.start_time}
									</p>
									<p style={styles.p}>
										Ends on {event.end_date} at {event.end_time}
									</p>
								</CardContent>
								<div style={styles.info}>
									{event.in_person ? (
										<Stack style={styles.chips} direction="row" spacing={1}>
											<Chip label="In Person Event" variant="outlined" />
											<Chip label={event.category} variant="outlined" />
											<Chip label={event.owner} variant="outlined" />
											<Chip label={event.thread} variant="outlined" />
										</Stack>
									) : (
										<Stack style={styles.chips} direction="row" spacing={1}>
											<Chip label="Virtual Event" variant="outlined" />
											<Chip label={event.category} variant="outlined" />
											<Chip label={event.thread} variant="outlined" />
										</Stack>
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
										{event.attendees.map((attendee, index) => <AccountCircleIcon key={index} />)}
									</Box>
								</div>
							</Card>
						</div>
					))
				) : (
					<div>You have no events!</div>
				)}
			</div>
			<div className="userThreads">
				{userThreads.length ? (
					userThreads.map((thread) => (
						<div>
							<Card style={styles.card} sx={{ maxHeight: 250 }}>
								<CardContent style={styles.content}>
									<h2 style={styles.title}>{thread.title}</h2>
									<p style={styles.p}>Moderated by {thread.moderator}</p>
									<p style={styles.p}>Created on {thread.date_created}</p>
								</CardContent>
								<div>
									<Stack style={styles.chips} direction="row" spacing={1}>
										<Chip
											avatar={<Avatar>{thread.posts.length}</Avatar>}
											label="Posts"
											variant="outlined"
										/>
										<Chip
											avatar={<Avatar>{thread.events.length}</Avatar>}
											label="Events"
											variant="outlined"
										/>
										<Chip
											avatar={<Avatar>{thread.members.length}</Avatar>}
											label="Members"
											variant="outlined"
										/>
									</Stack>
								</div>
							</Card>
						</div>
					))
				) : (
					<div>You have no threads!</div>
				)}
			</div>
		</div>
	);
}
