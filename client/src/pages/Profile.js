import React from "react";
import { Redirect, useParams } from 'react-router-dom';

import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import ProfileFriends from "../components/ProfileFriends";


function Profile(props) {

    const { userId } = useParams();

    

    return (
        <React.Fragment>
            <NavBar/>
            <div className="app-content-container">
                <Sidebar/>
                <ProfileInfo/>
                <ProfileFriends/>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Profile;
