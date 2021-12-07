import React from "react";

const toggleSidebar = () => {

    console.log('toggleSidebar fired')
    const  sidebar = document.querySelector('#sidebar');
    const  aside = document.querySelector('#aside');
    let sidebarDisplay = sidebar.getAttribute("data-sidebardisplay");

    if(sidebarDisplay === "hidden"){
        sidebar.style.left = '2.5rem';
        sidebar.setAttribute("data-sidebardisplay", "visible");
        aside.style.width = "100%";
    } else {
        sidebar.style.left = '-100%';
        sidebar.setAttribute("data-sidebardisplay", "hidden");
        aside.style.width = "3rem";
    }
}

function Sidebar(props) {
    return (
        <aside className="aside" id="aside">
            <div className="sticky-dash">
                <ul>
                    <li><img onClick={toggleSidebar}src="/assets/img/thread.svg" id="menu" alt="click to open sidebar"/></li>
                    <li><img src="/assets/img/msg.svg" alt="click to open profile"/></li>
                    <li><img src="/assets/img/profile.svg" alt="click to open profile"/></li>
                    <li><img src="/assets/img/friends.svg" /></li>
                </ul>
             </div>
             <div className="sidebar" id="sidebar" data-sidebardisplay="hidden">
                <div>
                    <h3>Threads</h3>
                    <ul>
                        <li><a href="/">Austin Code Bootcamp Students</a></li>
                        <li><a href="/">Cool People </a></li>
                        <li><a href="/">Nathan</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li className="add-thread-row">
                            <img className="sidebar-add-icon" src="/assets/img/add.svg" alt="click to add thread" />
                            <span>Thread</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>DM's</h3>
                    <ul>
                        <li><a href="/">Austin</a></li>
                        <li><a href="/">Mike</a></li>
                        <li><a href="/">Nikey</a></li>
                        <li><a href="/">Toby Mack</a></li>
                        <li className="add-dm-row">
                            <img className="sidebar-add-icon" src="/assets/img/add.svg" alt="click to add dm" />
                            <span>Message</span>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;
