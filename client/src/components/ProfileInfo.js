import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';

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

function ProfileInfo(props) {
    return (
        <div className="profile-wrapper">
            <div className="profile-content-container">
                <div className="profile-header">
                    <h3>Profile</h3>
                </div>
                <div className="profile-img">
                    <div className="placeholder-img"/>
                </div>
                <span className="user-name">Cole Cochran</span>
                <br/>
                <span>Member since 2021</span>
                <div className="Bio">
                        sadasdsad asd asd asd asd asd asd asd as dsad asd asd asd sad 
                        asd asd asd asd asd asd as dasd sad asd as asdad asd asd asd asdasd
                </div>
                <div className="user-info">
                    <div className="tech-stack">
                        <ul>
                        <li><Chip icon={<FaceIcon />} label="With Icon" variant="outlined" /></li>
                        <li><Chip icon={<FaceIcon />} label="With Icon" variant="outlined" /></li>
                        <li><Chip icon={<FaceIcon />} label="With Icon" variant="outlined" /></li>
                        <li><Chip icon={<FaceIcon />} label="With Icon" variant="outlined" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;