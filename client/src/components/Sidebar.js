import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

function toggleSidebarPanelDisplay(){
    const  threadPanel = document.querySelector('#sidebar-thread-panel');
    const  eventPanel = document.querySelector('#sidebar-event-panel');
}


function Sidebar(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <aside className="aside" id="aside">
            <div className="sticky-dash">
                <ul>
                    <li><img onClick={toggleSidebar} src="/assets/img/thread.svg" id="menu" alt="click to open sidebar"/></li>
                    <li><Link to="/sendbird"><img src="/assets/img/msg.svg" alt="click to open profile"/></Link></li>
                    <li><Link to="/"><img src="/assets/img/subthread.svg" alt="click to open profile"/></Link></li>
                    <li><Link to="/profile"><img src="/assets/img/profile.svg" alt="click to open profile"/></Link></li>
                    <li><img src="/assets/img/event.svg" alt="click to open profile" onClick={toggleSidebarPanelDisplay}/></li>
                    <li><Link to="/"><img src="/assets/img/logout.svg" alt="click to open profile"/></Link></li>
                </ul>
             </div>
             <div className="sidebar" id="sidebar" data-sidebardisplay="hidden">
                <div id="sidebar-thread-panel">
                    <div class="thread-sidebar-header">
                        <h3>Threads</h3> 
                        <img className="sidebar-add-icon" src="/assets/img/add.svg" alt="click to add thread" onClick={handleOpen}/>
                    </div>
                    <ul>
                        <li><a href="/">Austin Code Bootcamp Students</a></li>
                        <li><a href="/">Cool People </a></li>
                        <li><a href="/">Nathan</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                    </ul>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>
                </div>
                <div id="sidebar-event-panel">
                    <div class="thread-sidebar-header">
                        <h3>Events</h3> 
                        <img className="sidebar-add-icon" src="/assets/img/add.svg" alt="click to add thread" onClick={handleOpen}/>
                    </div>
                    <ul>
                        <li><a href="/">Austin Code Bootcamp Students</a></li>
                        <li><a href="/">Cool People </a></li>
                        <li><a href="/">Nathan</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                        <li><a href="/">Megantron</a></li>
                    </ul>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </div>
        </aside>
    )
}
    

export default Sidebar;
