import React from "react";
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ThreadCreation from "./ThreadCreation";
import EventCreation from "./EventCreation";

import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';
import { ALL_THREADS, ALL_EVENTS } from '../utils/queries';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    maxWidth: "500px",
    bgcolor: '#232323',
    boxShadow: 24,
    border: '2px solid white'
};

export default function SidebarPanel() {}

    // const [open, setOpen] = React.useState({
    //     threadCreate: false,
    //     eventCreate: false
    // });

    // const allTheEvents = useQuery(ALL_EVENTS);
    // const allTheThreads = useQuery(ALL_THREADS);

    // const errors = allTheThreads.error || allTheEvents.error;
	// const loading = allTheThreads.loading || allTheEvents.loading;

    // const handleOpen = (event) => {
    //     event.preventDefault();
    //     const { id } = event.target;
    //     if (id === "thread-create-btn") {
    //         setOpen({
    //             ...open,
    //             threadCreate: true
    //         })
    //     } else if (id === "event-create-btn") {
    //         setOpen({
    //             ...open,
    //             eventCreate: true
    //         })
    //     }
    //     setOpen(true);
    // }
    
    // const handleClose = () => setOpen({
    //     eventCreate: false,
    //     threadCreate: false
    // });

    // if (loading) {
    //     return <h2>Loading...</h2>
    // } else {
    //     console.log(allTheThreads)
    //     console.log(allTheEvents)
    // }

    // const allThreads = allTheThreads.data.allThreads;
    // // const allThreads = allTheThreads.data?.allThreads || [];
    // const allEvents = allTheEvents.data.allEvents;
    // // const allEvents = allTheEvents.data?.allEvents || [];
    
//     return (
//         <div id="sidebar-main-panel" data-panel="sidebar-main-panel">
//             <div id="sidebar-thread-panel">
//                 <div className="thread-sidebar-header">
//                     <h3>Threads</h3> 
//                     <img id="thread-create-btn" className="sidebar-add-icon" src="../assets/img/plus-sign.svg" alt="click to add thread" onClick={handleOpen}/>
//                 </div>
//                 <ul>
//                     {allThreads.map((individualThread) => (
//                         <li key={individualThread._id}>
//                             <Link
//                             onClick={null}
//                                 to={`/threads/${individualThread._id}`}
//                             >
//                                 {individualThread.title}
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div id="sidebar-events-panel">
//                 <div className="thread-sidebar-header">
//                     <h3>Events</h3> 
//                     <img id="thread-create-btn" className="sidebar-add-icon" src="../assets/img/plus-sign.svg" alt="click to add thread" onClick={handleOpen}/>
//                 </div>
//                 <ul>
//                     {allEvents.map((event) => (
//                         <li key={event._id}>
//                             <Link to={`/events/${event._id}`}>
//                                 {event.title}
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <Modal
//                 open={open.threadCreate}
//                 onClose={handleClose}
//                 id="threads-panel"
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <ThreadCreation />
//                 </Box>
//             </Modal>
//             <Modal
//                 open={open.eventCreate}
//                 onClose={handleClose}
//                 id="events-panel"
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <EventCreation />
//                 </Box>
//             </Modal>
//         </div>
//     )
// }
