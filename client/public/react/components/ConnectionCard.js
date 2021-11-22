import React from 'react';

function ConnectionCard(props) {
	//* make it random for now
	let randomStatus = Math.random();
	let currently_online = false;
	if (randomStatus > 0.5) currently_online = true;

	return (
		<div>
			<span>{'\u{1F601}'}</span>
			<span>Friend Name</span>
			{currently_online ? <span>Online</span> : <span>Offline</span>}
		</div>
	);
}

export default ConnectionCard;
