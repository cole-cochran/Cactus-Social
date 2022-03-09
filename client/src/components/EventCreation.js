import * as React from 'react';

import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { v4 as uuidv4 } from 'uuid';

import Axios from "axios";
// import { CloudinaryContext, Image } from 'cloudinary-react';

import { CREATE_EVENT } from '../utils/mutations';
//* CREATE_EVENT requires: threadId, title, description, start_date, end_date, start_time, end_time, category, in_person, location, image, and owner and it returns the Event

//! REDIRECT (AFTER SUBMISSION) TO THE EVENT DISPLAY

// TODO MAKE PRINT TO CONSOLE FOR AN ASCII CACTUS WITH A LINK TO MOVE YOUR FEET BY JUNIOR SENIOR

export default function EventCreation() {

	const [ createEvent ] = useMutation(CREATE_EVENT);

	const [ eventDetails, setEventDetails ] = React.useState({
		title: '',
		description: '',
		start_date: '',
		end_date: '',
		start_time: '',
		end_time: '',
		private: true,
		category: '',
		in_person: false,
		location: '',
		image: {},
		image_type: ''
	});

	const uploadImage = async (uuid) => {

		const formData = new FormData();
		formData.append("file", eventDetails.image);
		formData.append("upload_preset", "b3zjdfsi");
		formData.append("public_id", uuid);
		formData.append("folder", "CactusSocial");

		// console.log(eventDetails.image);
	
		// const response = 
		await Axios.post("https://api.cloudinary.com/v1_1/damienluzzo/image/upload", formData);
		// console.log(response);
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === 'in_person') {
			setEventDetails({ ...eventDetails, in_person: !eventDetails.in_person});
		} else if (name === "private") {
			setEventDetails({ ...eventDetails, private: !eventDetails.private});
		} else if (name === 'addImage') {
			setEventDetails({...eventDetails, image: event.target.files[0]})
			// console.log(event.target.files[0]);
		} else {
			setEventDetails({ ...eventDetails, [name]: value });
		}
	};

	const handleEventFormSubmit = async (event) => {
		event.preventDefault();

		const token = AuthService.loggedIn() ? AuthService.getToken() : null;

		if (!token) {
			return false;
		}

		const uuid = uuidv4();

		uploadImage(uuid);

		let fileType = eventDetails.image.name.split(".")[1].toLowerCase();

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
					private: eventDetails.private,
					in_person: eventDetails.in_person,
					location: eventDetails.location,
					image: `${uuid}`,
					image_type: fileType,
					owner: AuthService.getProfile().data._id
				}
			});

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
			private: true,
			category: '',
			in_person: false,
			location: '',
			image: {},
			image_type: ""
		});
	};

	return (
		<form onSubmit={handleEventFormSubmit} className='event-creation-form'>
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
					<label forhtml="addImage">Image</label>
					<input type='file' onChange={handleChange} name="addImage" id="addImage" />
				</div>
				<div>
					<label forhtml="private">Make Event Public?</label>
					<input type="checkbox" onChange={handleChange} id="private" name="private"/>
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
					<label forhtml="location">Location / URL</label>
					<input type="text" value={eventDetails.location} onChange={handleChange} id="location" name="location"/>
				</div>
				<button className="event-creation-button" type="submit">Create Event</button>
			</div>
		</form>
	);
}