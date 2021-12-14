import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ThreadCreation from "./ThreadCreation";

import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';

import { ALL_THREADS } from '../utils/queries';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

function ThreadsPanel() {

    const { loading, data } = useQuery(ALL_THREADS);
    const allThreads = data?.allThreads || [];

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <div id="sidebar-thread-panel">
            <div class="thread-sidebar-header">
                <h3>Threads</h3> 
                <img className="sidebar-add-icon" src="/assets/img/add.svg" alt="click to add thread" onClick={handleOpen}/>
            </div>
            <ul>
                {allThreads.map((individualThread) => (
                    <li key={individualThread._id}>
                        <Link
                            to={`/threads/${individualThread._id}`}
                        >
                            {individualThread.title}
                        </Link>
                    </li>
                ))}
                {/* <li><Link to="/home">Austin Code Bootcamp Students</Link><img src="" alt="" /></li> */}
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