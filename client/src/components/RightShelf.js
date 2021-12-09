import React from "react";

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import { THREAD_EVENTS, PINNED_POSTS } from '../utils/queries';
//* THREAD_EVENTS requires threadId and returns an array of events with access to the event's _id, title, start_date, end_date, start_time, end_time, owner {_id,username,picture}, attendees {_id, username, picture}, category, image, date_created, edited, and comments {_id}
//* PINNED_POSTS requires threadId and returns an array of posts with access to the post's _id, author {_id,username,picture}, pinTitle, and pinHash

function RightShelf(props) {
    return (
        <div className="right-shelf">
            <h3>Subthreads</h3>
            <ul>
                <li>#Austin Code Bootcamp</li>
                <li>Some good stuff</li>
                <li>Nachos</li>
                <li>Really interesting</li>
            </ul>
        </div>
    )
}

export default RightShelf;
