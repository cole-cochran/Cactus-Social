import React from "react";
import ConnectionCard from "./ConnectionCard";

function RightShelf() {
    return (
        <div>
            <h2>Right Shelf!</h2>
            <ul>
                <li>
                    <ConnectionCard />
                </li>
                <li>
                    <ConnectionCard />
                </li>
                <li>
                    <ConnectionCard />
                </li>
                <li>
                    <ConnectionCard />
                </li>
            </ul>
        </div>
    )
}

export default RightShelf;