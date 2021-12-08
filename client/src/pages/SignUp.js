import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function SignUp(props) {
	// set initial form state
	const [ signupData, setSignupData ] = useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: ''
	});

	const [ addUser, { error, data } ] = useMutation(CREATE_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSignupData({ ...signupData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// check if form has everything (as per react-bootstrap docs)

		try {
			const { data } = await addUser({
				variables: { ...signupData }
			});

			Auth.login(data.addUser.token);
		} catch (err) {
			console.error(err);
		}

		setSignupData({
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: ''
		});
	};

	return (
		<div className="signup-page">
			<div className="sign-up-header"></div>
			<div className="signup-form-section">
				<div className="center-signup-form">
					<div>
						<img className="one-cacti-illustration" src="/assets/img/one-cacti-illustration.svg"/>
					</div>
				{data ? (
					<p>
						Success! You may now head <Link to="/">back to the homepage.</Link>
					</p>
				) : (
					<form class="signup-form" onSubmit={handleFormSubmit}>
						<h3>Sign up for Cactus Social!</h3>

						<label for="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							placeholder="First Name"
							name="firstName"
							onChange={handleInputChange}
							value={signupData.firstName}
							required
						/>

						<label for="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							placeholder="Last Name"
							name="lastName"
							onChange={handleInputChange}
							value={signupData.lastName}
							required
						/>

						<label for="username">Username</label>
						<input
							type="text"
							id="username"
							placeholder="Username"
							name="username"
							onChange={handleInputChange}
							value={signupData.username}
							required
						/>

						<label for="email">Email Address</label>
						<input
							type="email"
							id="email"
							placeholder="Email"
							name="email"
							onChange={handleInputChange}
							value={signupData.email}
							required
						/>

						<label for="password">Password</label>
						<input
							type="password"
							id="password"
							placeholder="Password"
							name="password"
							onChange={handleInputChange}
							value={signupData.password}
							required
						/>

						<button
							type="submit"
							disabled={
								!(
									signupData.username &&
									signupData.email &&
									signupData.password &&
									signupData.firstName &&
									signupData.lastName
								)
							}
						>
							Sign Up
						</button>
					</form>
				)}
				{error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
					<div>
						<img className="two-cacti-illustration" src="/assets/img/two-cacti-illustration.svg"/>
					</div>
				</div>
			</div>
			<div className="signup-footer">
				<img src="#" alt="" />
			</div>
			<div className="signup-banner">
			</div>  
		</div>
	);
}

export default SignUp;
