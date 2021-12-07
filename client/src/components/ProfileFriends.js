import React from "react";

import { USER_FRIENDS } from '../utils/queries';
//* USER_FRIENDS accepts userId and returns the user's _id and friends which contains the friend's _id, username, and picture
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
//* ADD_FRIENDS accepts: userId and friend (which corresponds to the friend's _id)
//* REMOVE FRIENDS accepts: userId and friend (which corresponds to the friend's id)
//* Both return the updated User

import { useQuery, useMutation} from '@apollo/client';
import AuthService from '../utils/auth';

function ProfileFriends(props) {
    return (
        <div className="right-shelf">
            <h3>Friends</h3>
            <ul>
                <li>T.J.</li>
                <li>Mike Kappa</li>
                <li>Nachos</li>
                <li>Stan</li>
            </ul>
        </div>
    )
}

export default ProfileFriends;