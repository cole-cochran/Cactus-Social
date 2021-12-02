import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";


function Profile(props) {
    return (
        <React.Fragment>
            <NavBar/>
            <div className="app-content-container">
                <Sidebar/>
                <ProfileDisplay/>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Profile;
