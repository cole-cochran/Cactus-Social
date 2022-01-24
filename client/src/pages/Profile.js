import React from "react";
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { USER_PROFILE } from '../utils/queries'; 
//* USER_PROFILE accepts a userId and has access to _id, first_name, last_name, username, email, picture, bio, tech_stack, and date_joined

import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import ProfileFriends from "../components/ProfileFriends";


function Profile(props) {

    // TODO (profile) Create a way for users to toggle between a list of friends and a list of connections they have through common events or threads. We can probably do a dynamic display of the ProfileFriends component with a prop to differentiate the two.

    // TODO (profile) Potentially pass down userId into the sidebar to create a more personalized list of events/threads as well as the friends component to show only users friends and connections

    const { userId } = useParams();

    const { loading, data } = useQuery(USER_PROFILE, {
        variables: { userId: userId }
    });

    if (loading) {

		return (
			<div className='loading-icon-box'>
				<img className='loading-icon' src="../../assets/img/cactus_loading.svg" alt="loading icon"/>
			</div>
		)
	} 

    const specificUser = data.userProfile;

    return (
        <React.Fragment>
            <NavBar />
            <div className="app-content-container">
                <Sidebar />
                <div>
            <ProfileInfo specificUser={specificUser} />
                </div>
                <ProfileFriends />
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Profile;
