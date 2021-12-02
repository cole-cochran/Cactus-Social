// import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_EVENTS_AND_THREADS } from '../utils/queries';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';

export default function ProfilePopout() {
	// const { userId } = useParams();

	// const { loading, data } = useQuery(USER_EVENTS_AND_THREADS, {
	// 	variables: {
	// 		userId: userId
	// 	}
	// });

	// const userEvents = data?.events || [];
	// const userThreads = data?.threads || [];

	const userEvents = [
		{
			title: 'Camping Trip',
			start_date: '1/15/2022',
			end_date: '1/17/2022',
			start_time: '10:00 AM',
			end_time: '1:00 PM',
			category: 'Vacation',
			in_person: true,
			location: 'TBD',
			owner: 'bikerCole234',
			thread: 'Camping Trip',
			image:
				'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
			attendees: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'damienluzzo33', 'foxrigney1' ]
		}
	];

	const userThreads = [
		{
			title: 'Project 3 Ideas',
			moderator: 'damienluzzo33',
			members: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'damienluzzo33', 'foxrigney1' ],
			posts: [ 'post1', 'post2', 'post3', 'post4' ],
			events: [ 'event1', 'event2' ],
			date_created: '12/01/2021'
		},
		{
			title: 'Camping Trip',
			moderator: 'bikerCole234',
			members: [ 'bikerCole234', 'delmanat32', 'jackattack88', 'damienluzzo33', 'foxrigney1' ],
			posts: [ 'post1', 'post2', 'post3', 'post4', 'post5', 'post6' ],
			events: [ 'event1', 'event2', 'event3' ],
            date_created: '11/29/2021'
		}
	];

	// if (loading) {
	// return <div>Loading...</div>;
	// }

	const styles = {
		card: {
			display: 'flex',
			justifyContent: 'start',
			textAlign: 'center'
		},
		// media: {},
		content: {
            minWidth: "190px"
        },
		title: {
            fontSize: "20px",
            paddingBottom: "10px"
        },
		p: {
            fontSize: "11px"
        },
		chips: {
            margin: '10px',
			textAlign: 'center',
			justifyContent: 'center'
        },
        chip: {
            justifyContent: "start",
            height: "25px"
        },
        avatar: {
            height: "21px",
            width: "21px"
        },
		// info: {
            
        // },
		// box: {

        // }
	};

	return (
		<div className="userPopOut">
			<div className="userEvents">
				{userEvents.length ? (
					userEvents.map((event) => (
						<div>
							<Card style={styles.card} sx={{ maxHeight: 150 }}>
								<CardContent style={styles.content}>
									<h2 style={styles.title}>{event.title}</h2>
									<p style={styles.p}>
										Starts: {event.start_date} @ {event.start_time}
									</p>
									<p style={styles.p}>
										Ends: {event.end_date} @ {event.end_time}
									</p>
								</CardContent>
								<div style={styles.info}>
									{event.in_person ? (
										<div>
											<Stack style={styles.chips} spacing={1}>
												<Chip size="small" label="In Person Event" variant="outlined" />
												<Chip size="small" label={event.category} variant="outlined" />
											</Stack>
											<Stack style={styles.chips} spacing={1}>
												<Chip size="small" label={event.owner} variant="outlined" />
												<Chip size="small" label={event.thread} variant="outlined" />
											</Stack>
										</div>
									) : (
										<div>
											<Stack style={styles.chips} spacing={1}>
												<Chip size="small" label="Virtual Event" variant="outlined" />
												<Chip size="small" label={event.category} variant="outlined" />
												<Chip size="small" label={event.owner} variant="outlined" />
												<Chip size="small" label={event.thread} variant="outlined" />
											</Stack>
										</div>
									)}
									{/* <AvatarGroup max={4}> */}
									{/* <Avatar alt={event.attendees[0]} src="/static/images/avatar/1.jpg" /> */}
									{/* </AvatarGroup> */}
									{/* <Box
										style={styles.box}
										sx={{
											'& > :not(style)': {
												m: 1
											}
										}}
									>
										{event.attendees.map((attendee, index) => <AccountCircleIcon key={index} />)}
									</Box> */}
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
									<p style={styles.p}>By {thread.moderator}</p>
									<p style={styles.p}>Created on {thread.date_created}</p>
								</CardContent>
								<div>
									<Stack style={styles.chips} spacing={1}>
										<Chip style={styles.chip} color="secondary"
											avatar={<Avatar style={styles.avatar}>{thread.posts.length}</Avatar>}
											label="Posts"
											variant="outlined"
										/>
										<Chip style={styles.chip} color="secondary"
											avatar={<Avatar style={styles.avatar}>{thread.events.length}</Avatar>}
											label="Events"
											variant="outlined"
										/>
										<Chip style={styles.chip} color="secondary"
											avatar={<Avatar style={styles.avatar}>{thread.members.length}</Avatar>}
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
