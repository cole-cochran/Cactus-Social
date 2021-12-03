import React from 'react';

//*this is the new login
function Login(props) {
	return (
		<div class="login-page-body">
			<div class="login-banner-mobile" />
			<div class="login-form-section">
				<div class="logo-container">
					<img class="logo" src="./assets/img/logo.png" alt="cactus logo" />
				</div>
				<form class="login-form">
					<h3>Log in to your account</h3>
					<label for="login-email">Email Address</label>
					<input type="text" id="login-email" />
					<label for="login-password">Password</label>
					<input type="text" id="login-password" />
					<button>Next</button>
					<p>Don't have an account?</p>
					<a href="">Sign Up</a>
				</form>
			</div>
			<div class="login-banner">
				<h1>
					A sleek, secure,<br />
					and transparent platform...
				</h1>
				<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
				<img src="" alt="" />
			</div>
		</div>
	);
}
export default Login;
