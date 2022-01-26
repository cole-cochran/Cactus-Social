import * as React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_THREAD } from '../utils/mutations';
import AuthService from '../utils/auth';

export default function ThreadCreation() {
	const [ createThread ] = useMutation(CREATE_THREAD);

	const [ threadData, setThreadData ] = React.useState({
		title: '',
		moderator: AuthService.getProfile().data._id
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setThreadData({ ...threadData, [name]: value });
	};

	const handleThreadSubmit = async (event) => {
		event.preventDefault();

		const token = AuthService.loggedIn() ? AuthService.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const res = await createThread({
				variables: {
					title: threadData.title,
					moderator: AuthService.getProfile().data._id
				}
			});

			window.location.replace(`/threads/${res.data.createThread._id}`);
		} catch (err) {
			console.error(err);
		}

		setThreadData({
			title: ''
		});
	};

	return (
		<form className="modal-form" onSubmit={handleThreadSubmit}>
			<div className="modal-header">
				<h4>Create New Thread</h4>
			</div>
			<label>Title</label>
			<input
				type="text"
				name="title"
				onChange={handleInputChange}
				value={threadData.title}
				placeholder="e.g. Halo 2 Forum"
				required
			/>
			<button className="modal-button" type="submit">
				Create
			</button>
		</form>
	);
}
