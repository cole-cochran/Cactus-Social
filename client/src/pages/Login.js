import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../utils/mutations';
import AuthService from '../utils/auth';

//*this is the new login
function Login(props) {
	const [ formState, setFormState ] = useState({ username: '', password: '' });
	const [ loginUser, { error, data } ] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value
		});
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);
		try {
			const { data } = await loginUser({
				variables: { ...formState }
			});

			AuthService.login(data.loginUser.token);
		} catch (err) {
			console.error(err);
		}

		// clear form values
		setFormState({
			username: '',
			password: ''
		});
	};

	return (
		<div className="login-page-body">
			<div className="login-form-section">
				<div className="logo-container">
					<img className="logo" src="/assets/img/logo.svg" alt="cactus logo" />
				</div>
				{data ? (
					<p className='success-msg'>
						Success! You may now head{' '}
						<Link to="/">back to the homepage.</Link>
					</p>
				) : (
				<form className="login-form" onSubmit={handleFormSubmit}>
					<h3>Log in to your account</h3>
					<label for="username">Username</label>
					<input 
						type="text" 
						id="username"
						name="username"
						value={formState.username}
						onChange={handleChange}
						placeholder="Username"
					/>
					<label for="password">Password</label>
					<input 
						type="password" 
						id="password"
						name="password"
						value={formState.password}
						onChange={handleChange}
						placeholder="Password"
					/>
					<button
						className="login-button"
						style={{ cursor: 'pointer' }}
						type="submit"
					>
						Login
					</button>
					<p>Don't have an account?</p> <br></br>
					<Link to="/sign-up">Sign Up Here!</Link>
				</form>
				)}
				{error && (
					<div className="error-login">
						{error.message}
					</div>
				)}
			</div>
			<div className="login-banner-mobile" />
			<div className="login-banner">
				<div>
					<h1>
						A sleek, secure,<br />
						and transparent platform...
					</h1>
					<p>Login to see what your fellow developers are up to!</p>
				</div>
				<div className="login-banner-img-container">
					<img className="login-banner-illustration" src="../../assets/img/new_logo.png" alt="one cactus hanging out" />
				</div>

			</div>
		</div>
	);
}
export default Login;
