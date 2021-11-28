import React from "react";
import ConnectionCard from "./ConnectionCard";

function RightShelf() {
    return (
        <div>
            <h2>Right Shelf!</h2>
            <ul>
                //! probably do a map over a collection based on a fetch to the database of their connections which we need to enable database existence and functionality for
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