import React from "react";
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import { USER_FRIENDS, ALL_USERS } from '../utils/queries';
//* USER_FRIENDS accepts userId and returns the user's _id and friends which contains the friend's _id, username, and picture
//! MVP IS ALL USERS = FRIENDS
// import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
//* ADD_FRIENDS accepts: userId and friend (which corresponds to the friend's _id)
//* REMOVE FRIENDS accepts: userId and friend (which corresponds to the friend's id)
//* Both return the updated User

import { useQuery, useMutation} from '@apollo/client';
import AuthService from '../utils/auth';

function ProfileFriends(props) {
    const [searchUsername, setSearchUsername] = React.useState('');
    const friendsQuery = useQuery(USER_FRIENDS);
    const { loading, data } = useQuery(ALL_USERS);
    const allUsers = data?.allUsers || [];

    return (
        <React.Fragment>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="right-shelf">
                <h3>Friends</h3>
                <ul>
                    {allUsers.map((user, index) => (
                        <li key={`${user}-${index}`}>
                            <Link to={`/profile/${user._id}`}>
                                <Chip color="success" avatar={<Avatar src="../../public/assets/img/profile.svg" />}
                                label={user.username} />
                            </Link>
                        </li>
                    ))}
                </ul>
                </div>
            )}
        </React.Fragment>
    )
}

export default ProfileFriends;