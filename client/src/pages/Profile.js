import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";


function Profile(props) {
    return (
        <React.Fragment>
            <NavBar/>
            <div className="app-content-container">
                <Sidebar/>
                <ProfileInfo/>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Profile;
