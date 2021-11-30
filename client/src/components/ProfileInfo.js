import React from "react";

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
                <div className="user-info">
                    <span className="user-name">Cole Cochran</span>
                    <div className="tech-stack">
                        <ul>
                            <li>Javascript</li>
                            <li>React</li>
                            <li>Node.js</li>
                            <li>MySQL</li>
                        </ul>
                        <span>member since 2021</span>
                    </div>
                </div>
                <div className="Bio">
                        sadasdsad asd asd asd asd asd asd asd as dsad asd asd asd sad 
                        asd asd asd asd asd asd as dasd sad asd as asdad asd asd asd asdasd
                        
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;