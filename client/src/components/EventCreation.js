import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// date and time field
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Stack from '@mui/material/Stack';
import MobileTimePicker from '@mui/lab/MobileTimePicker';

import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { CREATE_EVENT } from '../utils/mutations';
//* CREATE_EVENT requires: threadId, title, description, start_date, end_date, start_time, end_time, category, in_person, location, image, and owner and it returns the Event

//! REDIRECT (AFTER SUBMISSION) TO THE EVENT DISPLAY

// TODO MAKE THIS CONSOLE.LOG A CACTUS INSTEAD WITH A LINK TO MOVE YOUR FEET BY JUNIOR SENIOR

// console.log("super secret dev link")
// console.log("https://www.youtube.com/watch?v=Qi1KebO4bzc")

export default function EventCreation(props) {
	const { threadId } = props;

	const [ checked, setChecked ] = React.useState(true);

	const [ createEvent ] = useMutation(CREATE_EVENT);

	const [ eventDetails, setEventDetails ] = React.useState({
		title: '',
		description: '',
		start_date: '',
		end_date: '',
		start_time: '',
		end_time: '',
		category: '',
		location: '',
		image: ''
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setEventDetails({ ...eventDetails, [name]: value });
	};

	const handleCheck = (event) => {
		setChecked(event.target.checked);
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
					in_person: checked,
					location: eventDetails.location,
					image: eventDetails.image,
					thread: threadId,
					owner: AuthService.getProfile().data._id
				}
			});

			console.log(res.data);
      window.location.replace(`events/${res.data.createEvent._id}`)
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
			location: '',
			image: ''
		});
	};

	return (
		<FormControl onSubmit={handleEventFormSubmit}>
			<Box sx={{ width: 500, maxWidth: '100%', m: 2 }}>
				<TextField fullWidth value={eventDetails.title} onChange={handleChange} label="Title" id="fullWidth" />
			</Box>
			<Box
				sx={{
					width: 500,
					maxWidth: '100%',
					m: 2
				}}
			>
				<TextField
					value={eventDetails.description}
					onChange={handleChange}
					fullWidth
					label="Description"
					id="fullWidth"
				/>
			</Box>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack
					spacing={3}
					sx={{
						width: 500,
						maxWidth: '100%',
						m: 2
					}}
				>
					<MobileDatePicker
						label="start_date"
						inputFormat="MM/dd/yyyy"
						value={eventDetails.start_date}
						onChange={handleChange}
						renderInput={() => <TextField />}
					/>
					<MobileDatePicker
						label="end_date"
						inputFormat="MM/dd/yyyy"
						value={eventDetails.end_date}
						onChange={handleChange}
						renderInput={() => <TextField />}
					/>
					<MobileTimePicker
						name="start_time"
						value={eventDetails.start_time}
						onChange={handleChange}
						label="Start Time"
						renderInput={() => <TextField />}
					/>
					<MobileTimePicker
						name="end_time"
						value={eventDetails.end_time}
						onChange={handleChange}
						label="End Time"
						renderInput={() => <TextField />}
					/>
				</Stack>
			</LocalizationProvider>
			<Box
				sx={{
					width: 500,
					maxWidth: '100%',
					m: 2
				}}
			>
				<TextField
					name="category"
					value={eventDetails.category}
					onChange={handleChange}
					fullWidth
					label="Category"
					id="fullWidth"
				/>
			</Box>
			<FormGroup
				sx={{
					width: 500,
					maxWidth: '100%',
					m: 2
				}}
			>
				<Stack direction="row" spacing={1} alignItems="center">
					<Typography>Virtual</Typography>
					<Switch
						value={checked}
						checked={checked}
						onChange={handleCheck}
						inputProps={{ 'aria-label': 'controlled' }}
					/>
					<Typography>In Person</Typography>
				</Stack>
			</FormGroup>
			<Box
				sx={{
					width: 500,
					maxWidth: '100%',
					m: 2
				}}
			>
				<TextField
					value={eventDetails.description}
					onChange={handleChange}
					fullWidth
					label="Location"
					id="fullWidth"
				/>
			</Box>
			<FormGroup>
				<button type="submit">Create Event</button>
			</FormGroup>
		</FormControl>
	);
}
