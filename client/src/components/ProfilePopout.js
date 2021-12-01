// import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_EVENTS_AND_THREADS } from '../utils/queries';

export default function ProfilePopout() {
    const { userId } = useParams();

	const { loading, data } = useQuery(USER_EVENTS_AND_THREADS, { 
        variables: {
            userId: userId
        }
    });

	const userEvents = data?.events || [];
    // const userThreads = data?.threads || [];

	if (loading) {
		return <div>Loading...</div>;
	}

    return (
        <div>
            <div>
                {userEvents.length ? (
                    userEvents.map((event) => (
                        <div>
                            <h2>{event.title}</h2>
                            <p>Starts on {event.start_date} at {event.start_time}</p>
                            <p>Ends on {event.end_date} at {event.end_time}</p>
                        </div>
                    ))
                ) : (
                    <div>
                        You have no events!
                    </div>
                )}
            </div>
            

        </div>
        
    )
}