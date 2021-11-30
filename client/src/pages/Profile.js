import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import ProfileFriends from "../components/ProfileFriends";


function Profile(props) {
    return (
        <React.Fragment>
        <Header/>
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