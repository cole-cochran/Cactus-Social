import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../utils/mutations';
import AuthService from '../utils/auth';

function SignUp() {
	// set initial form state
	const [ signupData, setSignupData ] = useState({
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		password: ''
	});

	const [ createUser, { error, data } ] = useMutation(CREATE_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSignupData({ ...signupData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await createUser({
				variables: { ...signupData }
			});

			AuthService.login(data.createUser.token);
		} catch (err) {
			console.error(err);
		}

		setSignupData({
			first_name: '',
			last_name: '',
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
						<img className="one-cacti-illustration" src="/assets/img/one-cacti-illustration.svg" alt="one cactus"/>
					</div>
				{data ? (
					<p>
						Success! You may now head <Link to="/">Back to the homepage</Link>
					</p>
				) : (
					<form class="signup-form" onSubmit={handleFormSubmit}>
						<h3>Sign up for Cactus Social!</h3>

						<label for="first_name">First Name</label>
						<input
							type="text"
							id="first_name"
							placeholder="First Name"
							name="first_name"
							onChange={handleInputChange}
							value={signupData.first_name}
							required
						/>

						<label for="last_name">Last Name</label>
						<input
							type="text"
							id="last_name"
							placeholder="Last Name"
							name="last_name"
							onChange={handleInputChange}
							value={signupData.last_name}
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
									signupData.first_name &&
									signupData.last_name
								)
							}
						>
							Sign Up
						</button>
					</form>
				)}
				{error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
					<div>
						<img className="two-cacti-illustration" src="/assets/img/two-cacti-illustration.svg" alt="two cacti"/>
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
