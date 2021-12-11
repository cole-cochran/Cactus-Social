import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { ALL_THREADS } from '../utils/queries';
import { CREATE_THREAD } from '../utils/mutations';

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

function ThreadsPanel(props) {

    const { loading, data } = useQuery(ALL_THREADS);
    const allThreads = data?.allThreads || [];

    const [createThread, { error }] = useMutation(CREATE_THREAD);

    const [threadData, setThreadData] = React.useState({
        threadTitle: '',
        moderator: AuthService.getProfile().data._id
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setThreadData({ ...threadData, [name]: value });
    };

    const handleThreadSubmit = async (event) => {
        event.preventDefault();

        const token = AuthService.loggedIn() ? AuthService.getToken() : null;

        if (!token) {
            return false;
        }
    
        try {
            const res = await createThread({
                variables: {
                    title: threadData.threadTitle,
                    // moderator: AuthService.getProfile().data._id
                    moderator: AuthService.getProfile().data._id
                },
            });

            console.log(res.data);
            window.location.replace(`/threads/${res.data.createThread._id}`);
        } catch (err) {
            console.error(err);
        }
    
        setThreadData({
            threadTitle: ''
        });
    };

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
                    <form className="modal-form" onSubmit={handleThreadSubmit}>
                        <div className="modal-header">
                            <h4>Create New Thread</h4>
                        </div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="threadTitle"
                            onChange={handleInputChange}
                            value={threadData.threadTitle}
                            placeholder="e.g. Halo 2 Forum"
                            required
                        />
                        <button className="modal-button" type="submit">Create</button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default ThreadsPanel;