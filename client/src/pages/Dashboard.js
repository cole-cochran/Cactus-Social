import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ThreadDisplay from "../components/ThreadDisplay";
import SubthreadDisplay from "../components/SubthreadDisplay";

import AuthService from '../utils/auth';

// import {io} from 'socket.io-client';
// const socket = io.connect('localhost:3001');

function Dashboard(props) {

    const userId = AuthService.getProfile().data._id

    const { socket, setActiveEvent, setActiveThread, activeThread, setActiveChat } = props;

    const [activeComment, setActiveComment] = React.useState('');

    return (
        <React.Fragment>
            <NavBar userId={userId} />
            <div className="app-content-container">
                <Sidebar setActiveThread={setActiveThread} setActiveEvent={setActiveEvent} setActiveChat={setActiveChat} />
                { props.subThread ? (
                    <SubthreadDisplay activeComment={activeComment} socket={socket} setActiveThread={setActiveThread}/>
                ) : (
                    <ThreadDisplay activeThread={activeThread} socket={socket} setActiveThread={setActiveThread} setActiveComment={setActiveComment}/>
                )}
                
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Dashboard;
