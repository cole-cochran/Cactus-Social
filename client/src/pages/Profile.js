import React from "react";
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { USER_PROFILE } from '../utils/queries'; 
//* USER_PROFILE accepts a userId and has access to _id, first_name, last_name, username, email, picture, bio, tech_stack, and date_joined

import NewNavbar from "../components/NewNavbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import ProfileFriends from "../components/ProfileFriends";

// const SERVER = 'http://localhost:3001';

function Profile(props) {

    // TODO (profile) Create a way for users to toggle between a list of friends and a list of connections they have through common events or threads. We can probably do a dynamic display of the ProfileFriends component with a prop to differentiate the two.

    const {setActiveThread, setActiveEvent, setActiveChat} = props;

    const { userId } = useParams();

    const { loading, data } = useQuery(USER_PROFILE, {
        variables: { userId: userId }
    });

    const specificUser = data?.userProfile || {};
    // console.log(specificUser);
    // const [ addedTech, setAddedTech ] = React.useState('');
	// const [ techData, setTechData ] = React.useState(specificUser.tech_stack || []);

    if (loading) {

		return (
			<div className='loading-icon-box'>
				<img className='loading-icon' src="../../assets/img/cactus_loading.svg" alt="loading icon"/>
			</div>
		)
	} 

    // const specificUser = data.userProfile;

    return (
        <React.Fragment>
            <NewNavbar />
            <div className="app-content-container">
                <Sidebar setActiveChat={setActiveChat} setActiveThread={setActiveThread} setActiveEvent={setActiveEvent}/>
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
