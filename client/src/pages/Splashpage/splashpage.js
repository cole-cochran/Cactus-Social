import React from 'react';
import CACTUSVIDEO from './CACTUSVIDEO.mp4';

function SplashPage() {
	return (
		<div className="App">
			<video
				autoPlay
				loop
				muted
				style={{
					position: 'absolute',
					width: '100%',
					left: '50%',
					top: '50%',
					height: '100%',
					objectFit: 'cover',
					transform: 'translate(-50%, -50%)',
					zIndex: '-1'
				}}
			>
				<source src={CACTUSVIDEO} type="video/mp4" />
			</video>
		</div>
	);
}

export default SplashPage;
