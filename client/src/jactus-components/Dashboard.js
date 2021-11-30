import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import ThreadDisplay from "./ThreadDisplay";
import RightShelf from "./RightShelf";

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
