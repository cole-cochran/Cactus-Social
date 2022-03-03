import React from 'react';
import { Link } from 'react-router-dom';
import ThreadsPanel from './ThreadsPanel';
import EventsPanel from './EventsPanel';
import ChatsPanel from './ChatsPanel';

import AuthService from '../utils/auth';

const toggleSidebar = (e) => {
	const sidebar = document.querySelector('#sidebar');
	const aside = document.querySelector('#aside');
	const openArrowBtn = document.querySelector('#open-arrow-btn');
	let sidebarDisplay = sidebar.getAttribute('data-sidebardisplay');
	const rightShelf = document.querySelector('.right-shelf');
	const profileWrapper = document.querySelector(".profile-wrapper");

	if (sidebarDisplay === 'hidden') {
		if (rightShelf && rightShelf.getAttribute("data-id") === "opened") {
			for (let i = 1; i < rightShelf.childNodes.length; i++) {
                rightShelf.childNodes[i].style.display = "none"
            }
			rightShelf.setAttribute("data-id", "closed");
            rightShelf.style.width = "4.5rem"
            rightShelf.style.paddingLeft = "0rem";
		}
		if (profileWrapper) {
			profileWrapper.style.width = "calc(100vw - 27rem)";
		}
		sidebar.style.left = '2.5rem';
		sidebar.setAttribute('data-sidebardisplay', 'visible');
		aside.style.minWidth = '22.5rem';
		openArrowBtn.style.transform = 'rotate(0deg)';
	} else {
		if (profileWrapper) {
			profileWrapper.style.width = "calc(100vw - 8rem)";
		}
		sidebar.style.left = '-100%';
		sidebar.setAttribute('data-sidebardisplay', 'hidden');
		aside.style.minWidth = '3rem';
		openArrowBtn.style.transform = 'rotate(180deg)';
	}
	toggleSidebarPanelDisplay(e);
};

function toggleSidebarPanelDisplay(e) {
	const sidebar = document.querySelector('#sidebar');
	let sidebarDisplay = sidebar.getAttribute('data-sidebardisplay');
	const threadPanel = document.querySelector('#sidebar-thread-panel');
	const eventsPanel = document.querySelector('#sidebar-events-panel');
	const chatsPanel = document.querySelector('#sidebar-chats-panel');
	if (sidebarDisplay === 'hidden') {
		threadPanel.style.display = 'none';
		eventsPanel.style.display = 'none';
		chatsPanel.style.display = 'none';
	} else {
		threadPanel.style.display = 'block';
		eventsPanel.style.display = 'block';
		chatsPanel.style.display = 'block';
	}
	
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
				<ChatsPanel toggle={toggleSidebar} setActiveChat={null}/>

			</div>
		</aside>
	);
}

export default Sidebar;
