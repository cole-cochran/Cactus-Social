import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';

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