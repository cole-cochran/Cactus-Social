import React from 'react';

function SignUp(props) {
	return (
		<div>
			<h1>Sign Up!</h1>
			<form>
				<label for="firstName">First Name: </label>
				<input type="text" id="firstName" />
				<label for="lastName">Last Name: </label>
				<input type="text" id="lastName" />
				<label for="username">Username: </label>
				<input type="text" id="username" />
				<label for="email">Email: </label>
				<input type="email" id="email" />
                <label for="password">Password: </label>
				<input type="password" id="password" />
                <label for="image">Profile Image: </label>
				<input type="image" id="image" />
                {/* //! Need to figure out how to do the kind of stuff they do in linked in skill searches - so probably need a database of techstack options, and then a selection below to store into the their tech stack array*/}
                <label for="techStack">Tech Stack: </label>
				<input type="text" id="techStack" />
				//! NEED TO FINISH EXAMPLE
			</form>
		</div>
	);
}

export default SignUp;
