import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import { ADD_TECH, REMOVE_TECH, UPDATE_BIO, UPDATE_PHOTO, SEND_FRIEND_REQUEST, REMOVE_FRIEND } from '../utils/mutations';
import { USER_PROFILE, ALL_USERS, USER_FRIENDS } from '../utils/queries';

import { useMutation, useQuery } from '@apollo/client';
import AuthService from '../utils/auth';

function ProfileInfo(props) {
	// TODO (profileInfo) Allow user quick access to create a new event or start a new thread without the sidebar

	// TODO (profileInfo) Add ability for user to include links (linkedIn, GitHub, Twitter) and the ability to display their work and projects with a cool way of importing the preview of the site without needing images or anything to be stored in database

	const { specificUser } = props;

	const userId = AuthService.getProfile().data._id;

    //* UPDATE_PHOTO needs: userId and picture args
	const [ updatePhoto ] = useMutation(UPDATE_PHOTO, {
		refetchQueries: [
			USER_PROFILE,
			"userProfile"
		]
	});
	const [ addTechnology ] = useMutation(ADD_TECH, {
		refetchQueries: [
			USER_PROFILE,
			"userProfile"
		]
	});
	const [ removeTechnology ] = useMutation(REMOVE_TECH, {
		refetchQueries: [
			USER_PROFILE,
			"userProfile"
		]
	});
	const [ updateBio ] = useMutation(UPDATE_BIO, {
		refetchQueries: [
			USER_PROFILE,
			"userProfile"
		]
	});

	const [ sendFriendRequest ] = useMutation(SEND_FRIEND_REQUEST, {
		refetchQueries: [
			USER_PROFILE,
			"userProfile"
		]
	});

	const [ removeFriend ] = useMutation(REMOVE_FRIEND, {
		refetchQueries: [
			USER_PROFILE,
			"userProfile"
		]
	});

    //* photo state
	const [ photo, setPhoto ] = React.useState(specificUser.picture || '');
    //* tech stack states for adding and updating tech data
	const [ addedTech, setAddedTech ] = React.useState('');
	const [ techData, setTechData ] = React.useState(specificUser.tech_stack || []);
    //* bio state
	const [ bio, setBio ] = React.useState(specificUser.bio || '');

    //* Modal states
	const [ openTech, setOpenTech ] = React.useState(false);
	const [ openBio, setOpenBio ] = React.useState(false);
	const [ openImage, setOpenImage ] = React.useState(false);

	const getAllUsers = useQuery(ALL_USERS);
	const getAllFriends = useQuery(USER_FRIENDS, {
		variables: {
			userId: userId
		}
	});

	const loading = getAllUsers.loading || getAllFriends.loading;

	const handleRemoveFriend = async (event) => {
		event.preventDefault();

		console.log(specificUser._id)

		try {
			await removeFriend({
				variables: {
					userId: userId,
					friend: specificUser._id
				}
			})
		} catch (err) {
			console.log(err);
		}
	}

	const handleSendFriendRequest = async (event) => {
		try {
			await sendFriendRequest({
				variables: {
					userId: userId,
					friend: specificUser._id
				}
			})
		} catch (err) {
			console.log(err);
		}
	}

    //* conditional modal openers
    const handleOpen = async (event) => {
        if (event.target.id === "editBio") {
            setOpenBio(true)
        } else if (event.target.id === "editTech") {
            setOpenTech(true)
        } else if (event.target.id === "editImage") {
            setOpenImage(true)
        }
    }

    //* conditional modal closers
	const handleClose = async (event) => {
        if (event.target.id === "bioModal") {
            setOpenBio(false)
        } else if (event.target.id === "techModal") {
            setOpenTech(false)
        } else if (event.target.id === "imageModal") {
            setOpenImage(false)
        }
    }

    //* make sure user is logged in and can only edit their own profile
	let canEditProfile = false;
	if (AuthService.loggedIn() && AuthService.getProfile().data._id === specificUser._id) {
		canEditProfile = true;
	}

	const handleChange = async (event) => {
		event.preventDefault();
		try {
			if (event.target.name === 'techInput') {
				setAddedTech(event.target.value);
			} else if (event.target.name === 'bioInput') {
				setBio(event.target.value);
			} else if (event.target.name === 'photoInput') {
				setPhoto(event.target.value);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleFormUpdate = async (event) => {
		try {
			event.preventDefault();
			if (event.target.id === 'userBio') {
				// const updatedBio = 
				await updateBio({
					variables: {
						userId: AuthService.getProfile().data._id,
						bio: bio
					}
				});
				setBio('');
				setOpenBio(false);
				// window.location.reload(false);
				
			} else if (event.target.id === 'userPhoto') {
				event.preventDefault();
				// const updatedPhoto = 
				await updatePhoto({
					variables: {
						userId: AuthService.getProfile().data._id,
						picture: photo
					}
				});
				setPhoto('');
				setOpenImage(false);
				// window.location.reload(false);

			} else if (event.target.id === 'addTechStack') {
				event.preventDefault();
				await addTechnology({
                    variables: {
                        userId: AuthService.getProfile().data._id,
                        technology: addedTech
                    }
                });
                setTechData([...techData, addedTech])
				setAddedTech('');
			}
		} catch (err) {
			console.error(err);
		}
	};

	//* for the final tech_stack submission
	const handleUpdateTech = async (event) => {
		event.preventDefault();
		try {
			setOpenTech(false);
			// window.location.reload(false);
		} catch (err) {
			console.error(err);
		}
	};

    //* handle the deletion of a technology from the user's tech stack
	const handleDelete = async (event) => {
        const deletedTech = event.target.parentNode.parentNode.firstChild.firstChild.textContent;
		await removeTechnology({
            variables: {
                userId: AuthService.getProfile().data._id,
                technology: deletedTech
            }
        });
		const editedTech = [...techData].filter((techName) => 
            techName !== deletedTech
        );
        setTechData(editedTech);
	};

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: "100%",
		maxWidth: "500px",
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
	};

	if (loading) {
		return <div>Loading...</div>
	}

	const allUsers = getAllUsers.data?.allUsers;

	console.log(allUsers);

	const allFriends = getAllFriends.data?.userFriends.friends;

	console.log(allFriends)

	let userFriendChecker = false;

	for (let friend of allFriends) {
		if (friend._id === specificUser._id) {
			userFriendChecker = true;
			break;
		}
	}

	return (
		<React.Fragment>
		<div className="profile-wrapper">
			<div className="profile-content-container">
				<div className="profile-header">
					<div className='profile-top'>
						<h3>
						{specificUser.first_name} {specificUser.last_name}
						</h3>
						{!canEditProfile ? (
						<div className='friend-options-div'>
							{userFriendChecker ? (
								<button className='remove-friend-btn' onClick={handleRemoveFriend}><img src="../../assets/img/minus_sign.png" alt="minus sign"/>Remove Friend</button>
							) : (
								<button className="send-request-btn" onClick={handleSendFriendRequest}><img src="../../assets/img/plus-sign.svg" alt="plus sign"/>Send Friend Request</button>
							)}
						</div>
					) : (
						<React.Fragment />
					)}
					</div>

					<div className='profile-bio-block'>
						<div className='profile-pic-div'>
							{/* <div style={imageStyles}>
								<InsertEmoticonIcon sx={{ width: "150px", height: "150px", alignSelf: "center" }} />
							</div> */}
							<img src="../../assets/img/default_profile_pic.png" alt="profile pic"/>
							{/* {canEditProfile && 
							<img className="edit-profile-pic" src="/assets/img/edit-icon.svg" alt="edit button" id="editImage" onClick={handleOpen} />
							} */}
						</div>
						<div className='profile-bio-section'>
							<h5>Bio</h5>
							<div className='user-bio-box'>
								<div className="user-bio">{specificUser.bio}</div>
								{canEditProfile && 
								<div style={{marginLeft: "10px"}}>
									<img style={{cursor: "pointer"}} src="/assets/img/edit-icon.svg" alt="edit button" id="editBio" onClick={handleOpen} />
								</div>}
							</div>
							
							<div className="profile-edit-container">
								<span className="join-date">Member Since: {specificUser.date_joined}</span>
							</div>
						</div>
							
					</div>
                    
				</div>
				{/* <div className="profile-edit-container">
					<span className="join-date">Member Since: {specificUser.date_joined}</span>
				</div>
                <div style={{display: "flex"}}>
                    <div className="user-bio">{specificUser.bio}</div>
                    {canEditProfile && 
                    <div style={{marginLeft: "10px"}}>
                        <img style={{cursor: "pointer"}} src="/assets/img/edit-icon.svg" alt="edit button" id="editBio" onClick={handleOpen} />
                    </div>}
                </div> */}
				<div className="user-info">
					<div style={{display: "flex"}} className="tech-stack">
						{canEditProfile && 
                        <div>
                            <img style={{cursor: "pointer"}} src="/assets/img/edit-icon.svg" alt="edit button" id="editTech" onClick={handleOpen} />
                        </div>}
						<ul>
							{specificUser.tech_stack.map((tech, index) => (
								<li key={`${tech}-${index}`}>
									<button className="tech-chip">
										{/* <div>{index}</div> */}
										{tech}
									</button>
								</li>
							))}
                        </ul>
					</div>
				</div>
			</div>
			<Modal
				open={openImage}
				onClose={handleClose}
                id="photoModal"
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form id="userPhoto" className="modal-form" onSubmit={handleFormUpdate}>
						<div className="modal-header">
							<h4>Update Profile Picture</h4>
						</div>
						<label>Image Path</label>
						<input name='photoInput' value={photo} onChange={handleChange} />
						<button className="modal-button" type="submit">
							Upload
						</button>
					</form>
				</Box>
			</Modal>
			<Modal
				open={openTech}
                id="techModal"
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form id="addTechStack" className="modal-form" onSubmit={handleFormUpdate}>
						<div className="modal-header">
							<h4>Update Tech Stack</h4>
						</div>
						<div className='tech-stack-icons'>
						{techData.map((tech) => (
                            <span key={tech}>
                                <Chip label={tech} variant="outlined"
								style={{color: "white"}} 
                                onDelete={handleDelete} deleteIcon={<DeleteForeverIcon style={{color: "white"}} />}/>
                            </span>
						))}
						</div>
						<label htmlFor="techInput">New Tech</label>
						<input id="techInput" name='techInput' value={addedTech} onChange={handleChange} placeholder="e.g. Javascript" />
						<div className='tech-btns-div'>
						<button className="modal-button" type="submit">
							Add Tech
						</button>
						<button className="modal-button" onClick={handleUpdateTech}>Finish</button>
						</div>
					</form>
				</Box>
			</Modal>
			<Modal
				open={openBio}
                id="bioModal"
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form id="userBio" className="modal-form" onSubmit={handleFormUpdate}>
						<div className="modal-header">
							<h4>Update Bio</h4>
						</div>
						<label>Your Bio</label>
						<textarea name='bioInput' value={bio} onChange={handleChange} className="modal-textarea">
							{specificUser.bio}
						</textarea>
						<button className="modal-button" type="submit">
							Add
						</button>
					</form>
				</Box>
			</Modal>
		</div>
		</React.Fragment>
	);
}

export default ProfileInfo;
