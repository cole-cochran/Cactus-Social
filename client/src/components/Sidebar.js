import React from 'react';
import { Link } from 'react-router-dom';
import ThreadsPanel from './ThreadsPanel';
import EventsPanel from './EventsPanel';

import AuthService from '../utils/auth';
// import SidebarPanel from './SidebarPanel';

// const threadIcon = document.querySelector('#thread-icon');
// const eventIcon = document.querySelector('#event-icon');


const toggleSidebar = (e) => {
	const sidebar = document.querySelector('#sidebar');
	const aside = document.querySelector('#aside');
	let sidebarDisplay = sidebar.getAttribute('data-sidebardisplay');

	if (sidebarDisplay === 'hidden') {
		// e.target.style.transform = 'rotate(180deg)';
		sidebar.style.left = '2.5rem';
		sidebar.setAttribute('data-sidebardisplay', 'visible');
		aside.style.minWidth = '22.5rem';
	} else {
		// e.target.style.transform = '';
		sidebar.style.left = '-100%';
		sidebar.setAttribute('data-sidebardisplay', 'hidden');
		aside.style.minWidth = '3rem';
	}
	toggleSidebarPanelDisplay(e);
};

function toggleSidebarPanelDisplay(e) {

	const threadPanel = document.querySelector('#sidebar-thread-panel');
	const eventsPanel = document.querySelector('#sidebar-events-panel');
	// const sidebarMainPanel = document.querySelector('#sidebar-main-panel');
	// console.log(sidebarMainPanel);
	// eventsPanel.style.display = 'none';
	// threadPanel.style.display = 'none';
	// sidebarMainPanel.style.display = 'none';

	// let panelAttribute = e.target.getAttribute('data-panel');

	// if (panelAttribute === 'events-panel') {
	// 	eventsPanel.style.display = 'block';
	// } else if (panelAttribute === 'threads-panel') {
	// 	threadPanel.style.display = 'block';
	// } else 
	// if (panelAttribute === 'sidebar-main-panel') {
		// sidebarMainPanel.style.display = 'block';
		threadPanel.style.display = 'block';
		eventsPanel.style.display = 'block';
	// }
}

function Sidebar(props) {

    const userId = AuthService.getProfile().data._id;

	return (
		<aside className="aside" id="aside">
			<div className="sticky-dash">
				<ul>
					<li>
						<img
							onClick={toggleSidebar}
							src="/assets/img/white-cactus.svg"
							data-panel="threads-panel"
							alt="click to open sidebar"
						/>
					</li>
					{/* <li>
						<img
							onClick={toggleSidebarPanelDisplay}
							src="/assets/img/google-docs.svg"
							data-panel="threads-panel"
							alt="click to open threads"
						/>
					</li>
					<li>
						<img
							onClick={toggleSidebarPanelDisplay}
							src="/assets/img/google-calendar.svg"
							data-panel="events-panel"
							alt="click to open events"
						/>
					</li> */}
					<li>
						{/* <Link to="/chat"> */}
							<img src="/assets/img/speech-bubble.svg" alt="click to open profile" />
						{/* </Link> */}
					</li>
					<li>
						<Link to={`/profile/${userId}`}>
							<img src="/assets/img/home-page.svg" alt="click to open profile" />
						</Link>
					</li>
					<li>
						<div onClick={AuthService.logout}>
							<img src="/assets/img/log-out.svg" alt="click to open profile" />
						</div>
					</li>
				</ul>
			</div>
			<div className="sidebar" id="sidebar" data-sidebardisplay="hidden">
				<ThreadsPanel toggle={toggleSidebar}/>
				<EventsPanel toggle={toggleSidebar}/>
				{/* <SidebarPanel /> */}
			</div>
		</aside>
	);
}

export default Sidebar;
