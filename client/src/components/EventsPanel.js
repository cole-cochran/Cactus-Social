import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EventCreation from "./EventCreation";

import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';

import { ALL_EVENTS, USER_EVENTS } from '../utils/queries';
import { modalStyle } from "../utils/constants";
import { toggleButtonClasses } from "@mui/material";


function EventsPanel(props) {

    const userId = AuthService.getProfile().data._id;
    const { setActiveEvent, toggle } = props;

    const getAllPublicEvents = useQuery(ALL_EVENTS);
    const getAllUserEvents = useQuery(USER_EVENTS, {
        variables: {
            userId: userId
        }
    })

    let loading = getAllPublicEvents.loading || getAllUserEvents.loading;

    const allEvents = getAllPublicEvents.data?.allEvents || [];
    const allUserEvents = getAllUserEvents.data?.userEvents || [];

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEventChange = (event, e) => {
        setActiveEvent(event);
        toggle(e);
    }
    const [droppedEvents, setDroppedEvents] = React.useState(false);
    const [droppedPublicEvents, setDroppedPublicEvents] = React.useState(false);

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

    const handleOpenPublicDropdown = (event) => {
        const eventInfo = document.getElementById("public-events-dropdown");

        setDroppedPublicEvents(true);
        eventInfo.style.display = "block";
    }

    const handleClosePublicDropdown = (event) => {
        const eventInfo = document.getElementById("public-events-dropdown");

        setDroppedPublicEvents(false);
        eventInfo.style.display = "none";
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    const publicEvents = allEvents.filter((event) => (
        event.private === false
    ))
    
    return (
        <div id="sidebar-events-panel">
            <div className="thread-sidebar-header">
                <div>
                    <img
                        style={{width: "35px", height: "auto", marginRight: "20px", marginLeft: "8px"}}
                        src="/assets/img/cactus_events_alt.png"
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
                <img id="event-create-btn" className="sidebar-add-icon" src="../assets/img/new_cactus_plus.png" alt="click to add thread" onClick={handleOpen}/>
            </div>
            <ul
            id="events-dropdown">
                {allUserEvents.map((event) => (
                    <li key={event._id}>
                        <Link onClick={(e) => {handleEventChange(event._id, e)}} to={`/events/${event._id}`} >
                            {event.title}
                        </Link>
                    </li>
                ))}
                <li className="public-dropdown">
                    <div className="public-threads-btn">
                        <h3>Public Events</h3>
                        {droppedPublicEvents ? (
                            <img
                                src="/assets/img/up_btn.png"
                                alt="threads icon"
                                onClick={handleClosePublicDropdown}
                            />
                        ) : (
                            <img
                                src="/assets/img/down_btn.png"
                                alt="threads icon"
                                onClick={handleOpenPublicDropdown}
                            />
                        )}
                        
                    </div>
                    <ul
                    id="public-events-dropdown">
                        {publicEvents.map((event) => (
                            <li key={event._id}>
                                <Link onClick={(e) => {handleEventChange(event._id)}} to={`/events/${event._id}`} >
                                    {event.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <EventCreation />
                </Box>
            </Modal>
        </div>
    )
}

export default EventsPanel;