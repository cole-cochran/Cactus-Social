import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ThreadDisplay from "../components/ThreadDisplay";
import RightShelf from "../components/RightShelf";

import { useParams } from 'react-router-dom';

function Dashboard(props) {

    const { threadId } = useParams();

    return (
        <React.Fragment>
            <NavBar/>
            <div className="app-content-container">
                <Sidebar threadId={threadId} />
                <ThreadDisplay threadId={threadId} />
                
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Dashboard;
