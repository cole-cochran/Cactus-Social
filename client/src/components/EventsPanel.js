import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EventCreation from "./EventCreation";

import { useQuery } from '@apollo/client';
// import AuthService from '../utils/auth';

import { ALL_EVENTS } from '../utils/queries';

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

function EventsPanel() {

    const {loading, data} = useQuery(ALL_EVENTS);

    const allEvents = data?.allEvents || [];

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [droppedEvents, setDroppedEvents] = React.useState(false);

    const handleOpenDropdown = (event) => {
        const eventInfo = document.getElementById("events-dropdown");

        setDroppedEvents(true);
        eventInfo.style.display = "block";
    }

    const handleCloseDropdown = (event) => {
        const eventInfo = document.getElementById("events-dropdown");

        setDroppedEvents(false);
        eventInfo.style.display = "none";
    }

    if (loading) {
        return <h2>Loading...</h2>
    }
    
    return (
        <div id="sidebar-events-panel">
            <div className="thread-sidebar-header">
                <div>
                    <img
                        src="/assets/img/google-calendar.svg"
                        alt="events icon"
                    />
                    <h3>Events</h3>
                    {droppedEvents ? (
                        <img
                            src="/assets/img/up_btn.png"
                            alt="threads icon"
                            onClick={handleCloseDropdown}
                        />
                    ) : (
                        <img
                            src="/assets/img/down_btn.png"
                            alt="threads icon"
                            onClick={handleOpenDropdown}
                        />
                    )}
                    
                </div>
                <img id="event-create-btn" className="sidebar-add-icon" src="../assets/img/plus-sign.svg" alt="click to add thread" onClick={handleOpen}/>
            </div>
            <ul
            id="events-dropdown">
                {allEvents.map((event) => (
                    <li key={event._id}>
                        <Link to={`/events/${event._id}`}>
                            {event.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EventCreation />
                </Box>
            </Modal>
        </div>
    )
}

export default EventsPanel;