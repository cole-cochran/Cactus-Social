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
	const openArrowBtn = document.querySelector('#open-arrow-btn');
	let sidebarDisplay = sidebar.getAttribute('data-sidebardisplay');
	const rightShelf = document.querySelector('.right-shelf');


	if (sidebarDisplay === 'hidden') {
		if (rightShelf) {
			rightShelf.style.display = 'none';
		}
		// e.target.style.transform = 'rotate(180deg)';
		sidebar.style.left = '2.5rem';
		sidebar.setAttribute('data-sidebardisplay', 'visible');
		aside.style.minWidth = '22.5rem';
		openArrowBtn.style.transform = 'rotate(0deg)';
	} else {
		if (rightShelf) {
			rightShelf.style.display = 'block';
		}
		// e.target.style.transform = '';
		sidebar.style.left = '-100%';
		sidebar.setAttribute('data-sidebardisplay', 'hidden');
		aside.style.minWidth = '3rem';
		openArrowBtn.style.transform = 'rotate(180deg)';
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
	const { setActiveThread, setActiveEvent } = props;
    const userId = AuthService.getProfile().data._id;

	return (
		<aside className="aside" id="aside">
			<div className="sticky-dash">
				<ul>
					<li>
						<img
							onClick={toggleSidebar}
							id="open-arrow-btn"
							style={{width: "25px", transform: "rotate(180deg)"}}
							src="/assets/img/cactus_opener.png"
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
					{/* <li> */}
						{/* <Link to="/chat"> */}
							{/* <img src="/assets/img/speech-bubble.svg" alt="click to open chat" /> */}
						{/* </Link> */}
					{/* </li> */}
					{/* <li>
						<Link to={`/profile/${userId}`}>
							<img style={{width: "30px"}} src="/assets/img/cactus_home_icon.png" alt="click to open profile" />
						</Link>
					</li>
					<li>
						<div onClick={AuthService.logout}>
							<img style={{width: "30px"}} src="/assets/img/cactus_logout.png" alt="click to logout" />
						</div>
					</li> */}
				</ul>
			</div>
			<div className="sidebar" id="sidebar" data-sidebardisplay="hidden">
				<div className='main-sidebar-navs'>
					<Link to={`/profile/${userId}`}>
						<img style={{width: "40px", height: "45px", marginRight: "18px"}} src="/assets/img/cactus_home_icon.png" alt="click to open profile" />
						<h3>Home</h3>
					</Link>
					<div onClick={AuthService.logout}>
						<img style={{width: "35px", height: "35px", marginLeft: "5px"}} src="/assets/img/cactus_logout.png" alt="click to logout" />
						<h3>Logout</h3>
					</div>
				</div>
						
				<ThreadsPanel toggle={toggleSidebar} setActiveThread={setActiveThread}/>
				<EventsPanel toggle={toggleSidebar} setActiveEvent={setActiveEvent}/>
			</div>
		</aside>
	);
}

export default Sidebar;
