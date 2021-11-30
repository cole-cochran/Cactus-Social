import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ThreadDisplay from "../components/ThreadDisplay";
import RightShelf from "../components/RightShelf";

function Dashboard(props) {
    return (
        <React.Fragment>
            <Header/>
            <div className="app-content-container">
                <Sidebar/>
                <ThreadDisplay/>
                <RightShelf/>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Dashboard;
