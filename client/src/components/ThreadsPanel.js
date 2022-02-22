import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ThreadCreation from "./ThreadCreation";

import { useQuery } from '@apollo/client';
// import AuthService from '../utils/auth';

import { ALL_THREADS } from '../utils/queries';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    maxWidth: "500px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

function ThreadsPanel(props) {

    const {toggle, setActiveThread} = props;

    const { loading, data } = useQuery(ALL_THREADS);
    const allThreads = data?.allThreads || [];

    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [droppedThreads, setDroppedThreads] = React.useState(false);

    const handleOpenDropdown = (event) => {
        const eventInfo = document.getElementById("threads-dropdown");

        setDroppedThreads(true);
        eventInfo.style.display = "block";
    }

    const handleCloseDropdown = (event) => {
        const eventInfo = document.getElementById("threads-dropdown");

        setDroppedThreads(false);
        eventInfo.style.display = "none";
    }
    
    const handleThreadChange = (thread, e) => {
        setActiveThread(thread);
        toggle(e);
    }

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <div id="sidebar-thread-panel">
            <div className="thread-sidebar-header">
                <div>
                    <img
                        style={{width: "45px", height: "auto", marginRight: "15px", marginLeft: "3px"}}
                        src="/assets/img/cactus_threads_icon.png"
                        alt="threads icon"
                    />
                    <h3>Threads</h3>
                    {droppedThreads ? (
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
                
                <img id="thread-create-btn" className="sidebar-add-icon" src="../assets/img/new_cactus_plus.png" alt="click to add thread" onClick={handleOpen}/>
            </div>
            <ul id="threads-dropdown">
                <h5>Your Threads</h5>
                {allThreads.map((individualThread) => (
                    <li key={individualThread._id}>
                        <Link
                        onClick={(e) => {
                            handleThreadChange(individualThread._id, e);
                        }}
                            to={`/threads/${individualThread._id}`}
                        >
                            {individualThread.title}
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
                    <ThreadCreation />
                </Box>
            </Modal>
        </div>
    )
}

export default ThreadsPanel;