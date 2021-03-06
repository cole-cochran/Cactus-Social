import React from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_EVENT } from '../utils/mutations';
import { EVENT_DETAILS } from '../utils/queries';

import { v4 as uuidv4 } from 'uuid';
import Axios from "axios";

export default function EventEditor(props) {

    const { eventData, eventId, handleCloseEditor} = props;

    const [ updateEvent ] = useMutation(UPDATE_EVENT, {
		refetchQueries: [
			EVENT_DETAILS,
			'eventDetails'
		]
	});

	// console.log(eventData);

    const [editedEvent, setEditedEvent] = React.useState(eventData);

    const handleEdit = async (event) => {
		event.preventDefault();
		// console.log(eventData.image);

		const uuid = uuidv4();
		let fileType = "";

		if (eventData.image !== editedEvent.image && editedEvent.image !== "") {
			const formData = new FormData();
			formData.append("file", editedEvent.image);
			formData.append("upload_preset", "b3zjdfsi");
			formData.append("public_id", uuid);
			formData.append("folder", "CactusSocial");

			// console.log(editedEvent.image);

			fileType = editedEvent.image.name.split(".")[1].toLowerCase();

			// editedEvent.image_type
			
			await Axios.post("https://api.cloudinary.com/v1_1/damienluzzo/image/upload", formData);
			// console.log(response);
		}

		try {

			// console.log(editedEvent);
			await updateEvent({
				variables: {
					eventId: eventId,
					title: editedEvent.title,
					description: editedEvent.description,
					start_date: editedEvent.start_date,
					end_date: editedEvent.end_date,
					start_time: timeParser(editedEvent.start_time),
					end_time: timeParser(editedEvent.end_time),
					private: editedEvent.private,
					category: editedEvent.category,
					in_person: editedEvent.in_person,
					location: editedEvent.location,
					image: (editedEvent.image !== eventData.image ? `${uuid}` : eventData.image),
					image_type: fileType
				}
			});
		} catch (err) {
			console.log(err);
		}
		handleCloseEditor();
	}

    const handleChange = async (event) => {
		const { name, value } = event.target;

		if (name === "in_person") {
			setEditedEvent({
				...editedEvent,
				in_person: !editedEvent.in_person
			})
		} else if (name === "private") {
			setEditedEvent({
				...editedEvent,
				private: !editedEvent.private
			})
		} else if (name === "addImage") {
			setEditedEvent({
				...editedEvent,
				image: event.target.files[0]
			})
		} else {
			setEditedEvent({
				...editedEvent,
				[name]: value
			})
		}
		
		// console.log(event.target.checked);
		// console.log(name);
	}

	const timeParser = (time) => {
		const editTime = time.split(" ");
		const editTimeAMPM = editTime[1];
		let editTimeTime = editTime[0];
		if (editTimeAMPM === "PM") {
			let hourMinArr = editTimeTime.split(":");
			const hour = parseInt(hourMinArr[0]) + 12;
			hourMinArr[0] = hour;
			editTimeTime = hourMinArr.join(":");
		}
		return editTimeTime;
	}

	const formattedEndTime = timeParser(editedEvent.end_time);
	const formattedStartTime = timeParser(editedEvent.start_time);

    return (
        <form className="event-edit-form" onSubmit={handleEdit}>
			<div className='event-edit-inputs'>
				<div>
					<label forhtml="title">Title</label>
					<input type="text" value={editedEvent.title} onChange={handleChange} id="title" name="title"></input>
				</div>
				<div>
					<label forhtml="description">Description</label>
					<input type="text" value={editedEvent.description} onChange={handleChange} id="description" name="description" ></input>
				</div>
				<div>
					<label forhtml="private">Make Event Public?</label>
					<input type="checkbox" checked={!editedEvent.private} onChange={handleChange} id="private" name="private" />
				</div>
				<div>
					<label forhtml="addImage">Image</label>
					<input style={{maxWidth: "250px"}} type='file' onChange={handleChange} name="addImage" id="addImage" />
				</div>
				<div>
					<label forhtml="start_date">Start Date</label>
					<input type="date" value={editedEvent.start_date} onChange={handleChange}  id="start_date" name="start_date" />
				</div>
				<div>
					<label forhtml="end_date">End Date</label>
					<input type="date" value={editedEvent.end_date} onChange={handleChange} id="end_date" name="end_date" />
				</div>
				<div>
					<label forhtml="start_time">Start Time</label>
					<input type="time" value={formattedStartTime} onChange={handleChange} id="start_time" name="start_time" />
				</div>
				<div>
					<label forhtml="end_time">End Time</label>
					<input type="time" value={formattedEndTime} onChange={handleChange} id="end_time" name="end_time" />
				</div>
				<div>
					<label forhtml="category">Category</label>
					<input type="text" value={editedEvent.category} onChange={handleChange} id="category" name="category" />
				</div>
				<div>
					<label forhtml="in_person">In Person Event</label>
					<input type="checkbox" checked={editedEvent.in_person} onChange={handleChange} id="in_person" name="in_person"/>
				</div>
				<div>
					<label forhtml="location">Event Location / URL</label>
					<input type="text" value={editedEvent.location} onChange={handleChange} id="location" name="location"/>
				</div>
				<button className="event-edit-button" type="submit">Update Event</button>
			</div>
		</form>
    )
}