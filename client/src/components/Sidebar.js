import React from 'react';
import { Link } from 'react-router-dom';
import ThreadsPanel from './ThreadsPanel';
import EventsPanel from './EventsPanel';

import AuthService from '../utils/auth';

//DOM QUERIES
//icons
const threadIcon = document.querySelector('#thread-icon');
const eventIcon = document.querySelector('#event-icon');
//panels

const toggleSidebar = (e) => {
	const sidebar = document.querySelector('#sidebar');
	const aside = document.querySelector('#aside');
	let sidebarDisplay = sidebar.getAttribute('data-sidebardisplay');

	if (sidebarDisplay === 'hidden') {
		e.target.style.transform = 'rotate(180deg)';
		sidebar.style.left = '2.5rem';
		sidebar.setAttribute('data-sidebardisplay', 'visible');
		aside.style.width = '100%';
	} else {
		e.target.style.transform = '';
		sidebar.style.left = '-100%';
		sidebar.setAttribute('data-sidebardisplay', 'hidden');
		aside.style.width = '3rem';
	}
	toggleSidebarPanelDisplay(e);
};

function toggleSidebarPanelDisplay(e) {
	console.log('toggle sidebar panel ran');

	const threadPanel = document.querySelector('#sidebar-thread-panel');
	const eventsPanel = document.querySelector('#sidebar-events-panel');

	eventsPanel.style.display = 'none';
	threadPanel.style.display = 'none';

	let panelAttribute = e.target.getAttribute('data-panel');

	if (panelAttribute === 'events-panel') {
		eventsPanel.style.display = 'block';
	} else if (panelAttribute === 'threads-panel') {
		threadPanel.style.display = 'block';
	}
}

function Sidebar(props) {

	// TODO (sidebar) Color coordinate active toggled sidebar

	// TODO (sidebar) add functionality for 

    const userId = AuthService.getProfile().data._id;

	return (
		<aside className="aside" id="aside">
			<div className="sticky-dash">
				<ul>
					<li>
						<img
							onClick={toggleSidebar}
							src="/assets/img/arrow-right.svg"
							data-panel="threads-panel"
							alt="click to open sidebar"
						/>
					</li>
					<li>
						<img
							onClick={toggleSidebarPanelDisplay}
							src="/assets/img/thread.svg"
							data-panel="threads-panel"
							alt="click to open sidebar"
						/>
					</li>
					<li>
						<img
							onClick={toggleSidebarPanelDisplay}
							src="/assets/img/event.svg"
							data-panel="events-panel"
							alt="click to open profile"
						/>
					</li>
					<li>
						<Link to="/chat">
							<img src="/assets/img/msg.svg" alt="click to open profile" />
						</Link>
					</li>
					<li>
						<Link to={`/profile/${userId}`}>
							<img src="/assets/img/profile.svg" alt="click to open profile" />
						</Link>
					</li>
					<li>
						<div onClick={AuthService.logout}>
							<img src="/assets/img/logout.svg" alt="click to open profile" />
						</div>
					</li>
				</ul>
			</div>
			<div className="sidebar" id="sidebar" data-sidebardisplay="hidden">
				<ThreadsPanel />
				<EventsPanel />
			</div>
		</aside>
	);
}

export default Sidebar;
