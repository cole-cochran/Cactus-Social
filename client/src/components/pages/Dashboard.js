import React from "react";
<<<<<<< HEAD:client/src/pages/Dashboard.js
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ThreadDisplay from "../components/ThreadDisplay";
import RightShelf from "../components/RightShelf";
=======
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import ThreadDisplay from "../ThreadDisplay";
import RightShelf from "../RightShelf";
>>>>>>> a88d854eab87f12991ec51cb1488ed7291fe27fa:client/src/components/pages/Dashboard.js

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
