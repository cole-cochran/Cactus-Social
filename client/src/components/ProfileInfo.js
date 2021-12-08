import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { USER_PROFILE } from '../utils/queries';
//* USER_PROFILE accepts a userId and has access to _id, first_name, last_name, username, email, picture, bio, tech_stack, and date_joined
import {ADD_TECH, REMOVE_TECH, UPDATE_BIO, UPDATE_PHOTO } from '../utils/mutations';
//* ADD_TECH needs: userId and technology args
//* REMOVE_TECH needs: userId and technology args
//* UPDATE_PHOTO needs: userId and picture args
//* UPDATE_BIO needs: userId and bio args
//* All of the above return the updated User

import { useQuery, useMutation} from '@apollo/client';
import AuthService from '../utils/auth';

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

function ProfileInfo(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="profile-wrapper">
            <div className="profile-content-container">
                <div className="profile-header">
                    <h3>Cole Cochran</h3>
                    <div className="profile-edit-container">
                        <span className="join-date">Member since 2021</span>
                        <img src="/assets/img/edit.svg" alt="edit button" onClick={handleOpen}/>
                    </div>
                </div>
                <div className="user-bio">
                    Cole appreciates neature walk and biking. He also likes hats and computer hardware. He used to work at the apple store.
                </div>
                <div className="user-info">
                    <div className="tech-stack">
                        <ul>
                            <li><Chip label="javascript" variant="outlined" /></li>
                            <li><Chip label="html" variant="outlined" /></li>
                            <li><Chip  label="css" variant="outlined" /></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className="modal-form">
                        <div className="modal-header">
                             <h4>Add Subthread</h4>
                         </div>
                        <label>Bio</label>
                        <textarea className="modal-textarea"></textarea>
                        <label>Your Tech Stack</label>
                        <input placeholder="e.g. Javascript" />
                        <input placeholder="e.g. PHP" />
                        <input placeholder="e.g. Ruby" />
                        <button className="modal-button" type="submit">Add</button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default ProfileInfo;