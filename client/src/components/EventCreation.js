import * as React from 'react';

import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { CREATE_EVENT } from '../utils/mutations';
//* CREATE_EVENT requires: threadId, title, description, start_date, end_date, start_time, end_time, category, in_person, location, image, and owner and it returns the Event

//! REDIRECT (AFTER SUBMISSION) TO THE EVENT DISPLAY

// TODO MAKE A CONSOLE.LOG FOR AN ASCII CACTUS WITH A LINK TO MOVE YOUR FEET BY JUNIOR SENIOR

export default function EventCreation() {

	const [ createEvent ] = useMutation(CREATE_EVENT);

	const [ eventDetails, setEventDetails ] = React.useState({
		title: '',
		description: '',
		start_date: '',
		end_date: '',
		start_time: '',
		end_time: '',
		category: '',
		in_person: false,
		location: '',
		image: ''
	});

	const handleChange = (event) => {
		console.log(event.target.value)
		const { name, value } = event.target;
		if (name === 'in_person') {
			setEventDetails({ ...eventDetails, in_person: !eventDetails.in_person})
		} else {
			setEventDetails({ ...eventDetails, [name]: value });
		}
		
		console.log(eventDetails);
	};

	const handleEventFormSubmit = async (event) => {
		event.preventDefault();

		const token = AuthService.loggedIn() ? AuthService.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const res = await createEvent({
				variables: {
					title: eventDetails.title,
					description: eventDetails.description,
					start_date: eventDetails.start_date,
					end_date: eventDetails.end_date,
					start_time: eventDetails.start_time,
					end_time: eventDetails.end_time,
					category: eventDetails.category,
					in_person: eventDetails.in_person,
					location: eventDetails.location,
					image: eventDetails.image,
					owner: AuthService.getProfile().data._id
				}
			});

			console.log(res.data);
			window.location.replace(`/events/${res.data.createEvent._id}`)
		} catch (err) {
			console.error(err);
		}

		setEventDetails({
			title: '',
			description: '',
			start_date: '',
			end_date: '',
			start_time: '',
			end_time: '',
			category: '',
			in_person: false,
			location: '',
			image: ''
		});
	};

	return (
		<form onSubmit={handleEventFormSubmit}>
			<div className='event-creation-inputs'>
				<div>
					<label forhtml="title">Title</label>
					<input type="text" value={eventDetails.title} onChange={handleChange} id="title" name="title"></input>
				</div>
				<div>
					<label forhtml="description">Description</label>
					<input type="text" value={eventDetails.description} onChange={handleChange} id="description" name="description" ></input>
				</div>
				<div>
					<label forhtml="start_date">Start Date</label>
					<input type="date" value={eventDetails.start_date} onChange={handleChange}  id="start_date" name="start_date" />
				</div>
				<div>
					<label forhtml="end_date">End Date</label>
					<input type="date" value={eventDetails.end_date} onChange={handleChange} id="end_date" name="end_date" />
				</div>
				<div>
					<label forhtml="start_time">Start Time</label>
					<input type="time" value={eventDetails.start_time} onChange={handleChange} id="start_time" name="start_time" />
				</div>
				<div>
					<label forhtml="end_time">End Time</label>
					<input type="time" value={eventDetails.end_time} onChange={handleChange} id="end_time" name="end_time" />
				</div>
				<div>
					<label forhtml="category">Category</label>
					<input type="text" value={eventDetails.category} onChange={handleChange} id="category" name="category" />
				</div>
				<div>
					<label forhtml="in_person">In Person Event</label>
					<input type="checkbox" value={eventDetails.in_person} onChange={handleChange} id="in_person" name="in_person"/>
				</div>
				<div>
					<label forhtml="location">Event Location / URL</label>
					<input type="text" value={eventDetails.location} onChange={handleChange} id="location" name="location"/>
				</div>
				<button type="submit">Create Event</button>
			</div>
		</form>
	);
}