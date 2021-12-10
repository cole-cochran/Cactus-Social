import React from "react";
import { Redirect, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { USER_PROFILE } from '../utils/queries'; 
//* USER_PROFILE accepts a userId and has access to _id, first_name, last_name, username, email, picture, bio, tech_stack, and date_joined

import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import ProfileFriends from "../components/ProfileFriends";


function Profile(props) {

    const { userId } = useParams();

    const { loading, data } = useQuery(USER_PROFILE, {
        variables: { userId: userId }
    });

    const specificUser = data?.userProfile || {};

    const [profileInfo, setProfileInfo] = React.useState(specificUser);

    if (loading) {
        return <p>loading...</p>;
    }

    return (
        <React.Fragment>
            <NavBar/>
            <div className="app-content-container">
                <Sidebar />
                <ProfileInfo specificUser={profileInfo} setProfile={setProfileInfo} />
                <ProfileFriends />
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Profile;
