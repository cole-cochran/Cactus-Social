import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ThreadDisplay from "../components/ThreadDisplay";
import SubthreadDisplay from "../components/SubthreadDisplay";

import { useParams } from 'react-router-dom';
import AuthService from '../utils/auth';

import {io} from 'socket.io-client';
const socket = io.connect('localhost:3001');

function Dashboard(props) {

    const userId = AuthService.getProfile().data._id

    // const { threadId, postId } = useParams();

    const [activeThread, setActiveThread] = React.useState('');

    
    // console.log('threadId, postId',threadId, postId);

    return (
        <React.Fragment>
            <NavBar userId={userId} />
            <div className="app-content-container">
                <Sidebar setActiveThread={setActiveThread}/>
                { props.subThread ? (
                    <SubthreadDisplay />
                ) : (
                    <ThreadDisplay activeThread={activeThread} socket={socket}/>
                )}
                
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Dashboard;
