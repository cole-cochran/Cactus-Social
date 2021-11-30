import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import AuthService from '../utils/auth';

function SignUp(props) {
	const [ formState, setFormState ] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		username: ''
	});
	const [ addUser ] = useMutation(CREATE_USER);

	const handleFormChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);
		try {
			window.localStorage.clear();
			const { data } = await addUser({
				variables: {
					first_name: formState.first_name,
					last_name: formState.last_name,
					username: formState.username,
					email: formState.email,
					password: formState.password
				}
			});

			const token = data.addUser.token;
			AuthService.login(token);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<h1>Sign Up!</h1>
			<form onSubmit={handleFormSubmit}>
				<label for="firstName">First Name: </label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					placeholder="First"
					value={formState.first_name}
					onChange={handleFormChange}
				/>
				<label for="lastName">Last Name: </label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					placeholder="Last"
					value={formState.last_name}
					onChange={handleFormChange}
				/>
				<label for="username">Username: </label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="Username"
					value={formState.username}
					onChange={handleFormChange}
				/>
				<label for="email">Email: </label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					value={formState.email}
					onChange={handleFormChange}
				/>
				<label for="password">Password: </label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="password"
					value={formState.password}
					onChange={handleFormChange}
				/>
				<button type="submit">Create Account</button>
			</form>
		</div>
	);
}

export default SignUp;
