import React from "react";
import StickyDash from "./StickyDash";
import ThreadDisplay from "./ThreadDisplay";
import RightShelf from "./RightShelf";

function Dashboard(props) {
    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <div>
                    <StickyDash />
                </div>
                <div>
                    <ThreadDisplay />
                </div>
                <div>
                    <RightShelf />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
