import React from 'react';
import CACTUSVIDEO from './CACTUSVIDEO.mp4';

function SplashPage() {
	return (
		<React.Fragment>
			<header class="splash-page-header">
				<img src="" alt="" />
				<button>Login</button>
			</header>
			<div className="splash-page-content">
				<h1>Social Cactus</h1>
				<p>
					I'm baby polaroid helvetica fam meggings, yr live-edge ugh cloud bread vexillologist celiac blue bottle woke.
				    Yr live-edge ugh cloud bread vexillologist celiac blue bottle woke.
				</p>
				<button className="splash-page-sign-up-button">Sign Up</button>
				<button className="splash-page-download-button">Download</button>
			</div>
			<video
				className="splash-page-video"
				autoPlay
				loop
				muted
				// style={{
				// 	position: 'absolute',
				// 	width: '100%',
				// 	left: '50%',
				// 	top: '50%',
				// 	height: '100%',
				// 	objectFit: 'cover',
				// 	transform: 'translate(-50%, -50%)',
				// 	zIndex: '-1'
				// }}
			>
				<source src={CACTUSVIDEO} type="video/mp4" />
			</video>
		</React.Fragment>
	);
}

export default SplashPage;
