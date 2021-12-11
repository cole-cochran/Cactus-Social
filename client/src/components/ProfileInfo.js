import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import { ADD_TECH, REMOVE_TECH, UPDATE_BIO, UPDATE_PHOTO } from '../utils/mutations';
//* ADD_TECH needs: userId and technology args
//* REMOVE_TECH needs: userId and technology args
//* UPDATE_PHOTO needs: userId and picture args
//* UPDATE_BIO needs: userId and bio args
//* All of the above return the updated User

import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24
};

function ProfileInfo(props) {
	const { specificUser } = props;
	console.log(specificUser);

    //* UPDATE_PHOTO needs: userId and picture args
	const [ updatePhoto ] = useMutation(UPDATE_PHOTO);
    //* ADD_TECH and REMOVE_TECH need: userId and technology args
	const [ addTechnology ] = useMutation(ADD_TECH);
	const [ removeTechnology ] = useMutation(REMOVE_TECH);
    //* UPDATE_BIO needs: userId and bio args
	const [ updateBio ] = useMutation(UPDATE_BIO);

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
                console.log(event.target.value)
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
		event.preventDefault();
		try {
			if (event.target.id === 'userBio') {
				const updatedBio = await updateBio({
					variables: {
						userId: AuthService.getProfile().data._id,
						bio: bio
					}
				});
				setBio('');
				window.location.reload(false);
			} else if (event.target.id === 'userPhoto') {
				const updatedPhoto = await updatePhoto({
					variables: {
						userId: AuthService.getProfile().data._id,
						picture: photo
					}
				});
				setPhoto('');
				window.location.reload(false);
			} else if (event.target.id === 'addTechStack') {
                console.log(addedTech)
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
			window.location.reload(false);
		} catch (err) {
			console.error(err);
		}
	};

    //* handle the deletion of a technology from the user's tech stack
	const handleDelete = async (event) => {
        console.log(event.target.parentNode.parentNode.firstChild.firstChild.textContent);
        const jsSucks = event.target.parentNode.parentNode.firstChild.firstChild.textContent;
		await removeTechnology({
            variables: {
                userId: AuthService.getProfile().data._id,
                technology: jsSucks
            }
        });
		const editedTech = [...techData].filter((techName) => 
            techName !== jsSucks
        );
        setTechData(editedTech);
	};

    const imageStyles = {
        height: "300px",
        width: "300px",
        borderRadius: "50%",
        backgroundColor: "green",
        color: "white",
        alignContent: "center",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column"
    }


	return (
		<div className="profile-wrapper">
			<div className="profile-content-container">
				<div className="profile-header">
                    <div>
                        <div style={imageStyles}>
                            <InsertEmoticonIcon sx={{ width: "200px", height: "200px", alignSelf: "center" }} />
                        </div>
                        {canEditProfile && 
                        <div>
                            <img style={{ backgroundColor: "white", padding: "5px", borderRadius: "50%", marginRight: "10px", position: "relative", bottom: "50px", left: "80px", cursor: "pointer"}} src="/assets/img/edit.svg" alt="edit button" id="editImage" onClick={handleOpen} />
                        </div>}
                    </div>
					<h3>
						{specificUser.first_name} {specificUser.last_name}
					</h3>
				</div>
				<div style={{}} className="profile-edit-container">
					<span className="join-date">Member Since: {specificUser.date_joined}</span>
				</div>
                <div style={{display: "flex"}}>
                    <div className="user-bio">{specificUser.bio}</div>
                    {canEditProfile && 
                    <div style={{marginLeft: "10px"}}>
                        <img style={{cursor: "pointer"}} src="/assets/img/edit.svg" alt="edit button" id="editBio" onClick={handleOpen} />
                    </div>}
                </div>
				
				<div className="user-info">
					<div style={{display: "flex"}} className="tech-stack">
						<ul>
							{techData.map((tech, index) => (
								<li key={`${tech}-${index}`}>
									<Chip label={tech} variant="outlined" />
								</li>
							))}
                        </ul>
                        {canEditProfile && 
                        <div>
                            <img style={{cursor: "pointer"}} src="/assets/img/edit.svg" alt="edit button" id="editTech" onClick={handleOpen} />
                        </div>}
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
						{techData.map((tech) => (
                            <span key={tech}>
                                <Chip label={tech} variant="outlined" 
                                onDelete={handleDelete} deleteIcon={<DeleteForeverIcon />}/>
                            </span>
						))}
						<label htmlFor="techInput">New Tech</label>
						<input id="techInput" name='techInput' value={addedTech} onChange={handleChange} placeholder="e.g. Javascript" />
						<button className="modal-button" type="submit">
							Add Technology
						</button>
					</form>
					<button onClick={handleUpdateTech}>Finish</button>
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
	);
}

export default ProfileInfo;
