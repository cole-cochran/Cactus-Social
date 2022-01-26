import React from 'react';


function UserSearchModal(props) {
    const [searchFriend, setSearchFriend] = React.useState('');
    const [foundFriend, setFoundFriend] = React.useState({});

    const {allUsers} = props;

    const handleChange = (e) => {
        e.preventDefault();
        setSearchFriend(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let friend = allUsers.filter((user) => user.username === searchFriend);
        console.log(friend);
        setFoundFriend(friend[0]);
    }

    return (
        <React.Fragment>
            <form className="modal-form" onSubmit={handleSubmit}>
                <label forhtml="friend_search">Search For Friends:</label>
                <input id="friend_search" value={searchFriend} onChange={handleChange}></input>
                {foundFriend._id ? (
                <li className='user-search-result'>
                    <a href = {`/profile/${foundFriend._id}`}>
                        <button className="friend-chips">
                            <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                            <p>{foundFriend.username}</p>
                        </button>
                    </a>
                </li>
            ) : (<React.Fragment />)}
            </form>
            {/* {foundFriend._id ? (
                <li>
                    <a href = {`/profile/${foundFriend._id}`}>
                        <button className="friend-chips">
                            <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
                            <p>{foundFriend.username}</p>
                        </button>
                    </a>
                </li>
            ) : (<React.Fragment />)} */}
        </React.Fragment>
    )
}

export default UserSearchModal;