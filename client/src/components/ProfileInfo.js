import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { v4 as uuidv4 } from 'uuid';
import Axios from "axios";
import { CloudinaryContext, Image } from 'cloudinary-react';

import { ADD_TECH, REMOVE_TECH, UPDATE_BIO, UPDATE_PHOTO, SEND_FRIEND_REQUEST, REMOVE_FRIEND, CREATE_PORTFOLIO_PROJECT, UPDATE_USER_LINKS } from '../utils/mutations';
import { USER_PROFILE, ALL_USERS, USER_FRIENDS } from '../utils/queries';

import { useMutation, useQuery } from '@apollo/client';
import AuthService from '../utils/auth';

import PortfolioProject from './PortfolioProject';
import { modalStyle, emptyProject } from '../utils/constants';
import { CreateProjectModal } from './Modals/Modals';

function ProfileInfo(props) {

	// TODO (profileInfo) Allow user quick access to create a new event or start a new thread without the sidebar

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

	const [ createPortfolioProject ] = useMutation(CREATE_PORTFOLIO_PROJECT, {
		refetchQueries: [
			USER_PROFILE,
			"userProfile"
		]
	});

	const [ updateUserLinks ] = useMutation(UPDATE_USER_LINKS, {
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
	const [createdProject, setCreatedProject] = React.useState(emptyProject);
	const [openProjectCreator, setOpenProjectCreator] = React.useState(false);

    //* Modal states
	const [ openTech, setOpenTech ] = React.useState(false);
	const [ openBio, setOpenBio ] = React.useState(false);
	const [ openImage, setOpenImage ] = React.useState(false);
	const [ openLinks, setOpenLinks ] = React.useState(false);

	const [ profileLinks, setProfileLinks ] = React.useState({
		linkedin: "",
		github: "",
		portfolio_page: ""
	});

	const [ openPins, setOpenPins ] = React.useState(false);

	const getAllUsers = useQuery(ALL_USERS);
	const getAllFriends = useQuery(USER_FRIENDS, {
		variables: {
			userId: userId
		}
	});

	const loading = getAllUsers.loading || getAllFriends.loading;

	const uploadImage = async (event) => {

		const uuid = uuidv4();

		event.preventDefault();
		const formData = new FormData();
		formData.append("file", photo);
		formData.append("upload_preset", "b3zjdfsi");
		formData.append("public_id", uuid);
		formData.append("folder", "CactusSocial");

		const fileType = photo.name.split(".")[1].toLowerCase();

		console.log(photo);

		await updatePhoto({
			variables: {
				userId: AuthService.getProfile().data._id,
				picture: `${uuid}`,
				picture_type: fileType
			}
		});
		
		await Axios.post("https://api.cloudinary.com/v1_1/damienluzzo/image/upload", formData);

		setPhoto('');
		setOpenImage(false);
	}


	const handleOpenPins = (event) => {
		setOpenPins(true);
	}

	const handleClosePins = (event) => {
		setOpenPins(false);
	}

	const handleOpenProjectCreator = (event) => {
		setOpenProjectCreator(true);
	}

	const handleCloseProjectCreator = (event) => {
		setOpenProjectCreator(false);
	}

	const handleProjectChange = async (event) => {
		const {value, name} = event.target;

		if (name === "addImage") {
            setCreatedProject({
                ...createdProject,
                image: event.target.files[0]
            })
        } else {
			setCreatedProject({
				...createdProject,
				[name]: value
			})
		}
	}

	const handleCreateProject = async (event) => {
		event.preventDefault();

		const uuid = uuidv4();
		let fileType = "";

		if (createdProject.image !== "") {
			const formData = new FormData();
			formData.append("file", createdProject.image);
			formData.append("upload_preset", "b3zjdfsi");
			formData.append("public_id", uuid);
			formData.append("folder", "CactusSocial");

			fileType = createdProject.image.name.split(".")[1].toLowerCase();
			
			await Axios.post("https://api.cloudinary.com/v1_1/damienluzzo/image/upload", formData);
		}

		try {
			await createPortfolioProject({
				variables: {
					owner: userId,
					title: createdProject.title,
					description: createdProject.description,
					image: (createdProject.image === "" ? "" : `${uuid}`),
					image_type: fileType,
					responsibilities: createdProject.responsibilities,
					techstack: createdProject.techstack,
					repo: createdProject.repo,
					demo: createdProject.demo
				}
			})
		} catch(err) {
			console.log(err);
		}

		setCreatedProject(emptyProject);
		handleCloseProjectCreator();
	}
	
	const handleRemoveFriend = async (event) => {
		event.preventDefault();

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
        } else if (event.target.id === "editLinks") {
			setOpenLinks(true);
			setProfileLinks({
				linkedin: specificUser.linkedin,
				github: specificUser.github,
				portfolio_page: specificUser.portfolio_page
			});
		}
    }

    //* conditional modal closers
	const handleClose = async (event) => {
		if (event.target.id !== "bioModal" || event.target.id !== "techModal" || event.target.id !== "imageModal" || event.target.id !== "linksModal") {
			setOpenBio(false);
			setOpenTech(false);
			setOpenImage(false);
			setOpenLinks(false);
		}
    }

    //* make sure user is logged in and can only edit their own profile
	let canEditProfile = false;
	if (AuthService.loggedIn() && AuthService.getProfile().data._id === specificUser._id) {
		canEditProfile = true;
	}

	const handleChange = async (event) => {
		// event.preventDefault();
		try {
			if (event.target.name === 'techInput') {
				setAddedTech(event.target.value);
			} else if (event.target.name === 'bioInput') {
				setBio(event.target.value);
			} else if (event.target.name === 'photoInput') {
				setPhoto(event.target.files[0]);
			} else if (event.target.name === "linkedin") {
				setProfileLinks({
					...profileLinks,
					linkedin: event.target.value
				})
			} else if (event.target.name === "github") {
				setProfileLinks({
					...profileLinks,
					github: event.target.value
				})
			} else if (event.target.name === "portfolio_page") {
				setProfileLinks({
					...profileLinks,
					portfolio_page: event.target.value
				})
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleFormUpdate = async (event) => {
		try {
			event.preventDefault();
			if (event.target.id === 'userBio') {
				await updateBio({
					variables: {
						userId: AuthService.getProfile().data._id,
						bio: bio
					}
				});
				setBio('');
				setOpenBio(false);
			} else if (event.target.id === 'addTechStack') {
				event.preventDefault();
				try {
					await addTechnology({
						variables: {
							userId: AuthService.getProfile().data._id,
							technology: addedTech
						}
					});
				} catch (err) {
					console.log(err);
				}
                setTechData([...techData, addedTech])
				setAddedTech('');
			} else if (event.target.id === 'profileLinks') {
				event.preventDefault();
				try {
					await updateUserLinks({
						variables: {
							userId: userId,
							linkedin: profileLinks.linkedin,
							github: profileLinks.github,
							portfolio_page: profileLinks.portfolio_page
						}
					})
				} catch(err) {
					console.log(err)
				}
				setProfileLinks({
					linkedin: "",
					github: "",
					portfolio_page: ""
				})
				setOpenLinks(false);
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

	const handleOpenDropdown = (event) => {
		const userData = event.target.parentNode.parentNode.parentNode.getAttribute('data-id');
		localStorage.setItem('userId', JSON.stringify(userData));
		const content = event.target.parentNode.childNodes[1];
		content.style.display = "flex";
	}

	const handleCloseDropdown = (event) => {
		if (event.target.className !== "dropdown-content" && event.target.className !== "dots" && event.target.className !== "dropdown-option") {
			const dropdowns = document.querySelectorAll('.dropdown-content');
			for (let dropdown of dropdowns) {
				dropdown.style.display = "none";
			}
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	const allUsers = getAllUsers.data?.allUsers;

	const allFriends = getAllFriends.data?.userFriends.friends;

	let userFriendChecker = false;
	for (let friend of allFriends) {
		if (friend._id === specificUser._id) {
			userFriendChecker = true;
			break;
		}
	}

	let userFirstNameArr = specificUser.first_name.split("");
	userFirstNameArr[0] = userFirstNameArr[0].toUpperCase();
	let updatedFirstName = userFirstNameArr.join("");

	let userLastNameArr = specificUser.last_name.split("");
	userLastNameArr[0] = userLastNameArr[0].toUpperCase();
	let updatedLastName = userLastNameArr.join("");

	return (
		<React.Fragment>
		<div className="profile-wrapper" onClick={handleCloseDropdown}>
			<div className="profile-content-container">
				<div className="profile-header">
					<div className='profile-top'>
						<div className='profile-title'>
							<h3>{`${updatedFirstName} ${updatedLastName}`}</h3>
							{ userId === specificUser._id && 
								<div className="dropdown">
									<img className="dots" src="../../assets/img/purple_dots.png" alt="pin" style={{width: "30px", height: "auto", marginRight: "5px", cursor: "pointer"}} onClick={handleOpenDropdown}/>
									<div className="dropdown-content" style={{width: "200px"}}>
										<div className="dropdown-option" onClick={handleOpenPins}>
											View Pinned Posts
										</div>
									</div>
								</div>
							}
						</div>
						{!canEditProfile ? (
						<div className='friend-options-div'>
							{userFriendChecker ? (
								<button className='remove-friend-btn' onClick={handleRemoveFriend}><img src="../../assets/img/minus_sign.png" alt="minus sign"/>Remove Friend</button>
							) : (
								<button className="send-request-btn" onClick={handleSendFriendRequest}><img src="../../assets/img/plus-sign.svg" alt="plus sign"/>Send Friend Request</button>
							)}
						</div>
					) : ( <React.Fragment /> )}
					</div>
					<div className='profile-bio-block'>
						<div className='profile-pic-div'>
							{specificUser.picture === "" ? (
								<img src="../../assets/img/default_profile_pic.png" alt="profile pic"/>
							) : (
								<CloudinaryContext cloudName="damienluzzo" >
									<Image publicId={`CactusSocial/${specificUser.picture}.${specificUser.picture_type}`} />
								</CloudinaryContext>
							)}

							{canEditProfile && 
							<img className="edit-profile-pic" src="/assets/img/edit-icon.svg" alt="edit button" id="editImage" onClick={handleOpen} />
							}
							
						</div>
						<div>
							<div className='profile-info-links'>
								<div>
									{specificUser.linkedin ? 
									(
										<a href={`${specificUser.linkedin}`} target='_blank' rel="noreferrer">
											<img src="../../assets/img/linked_in_2.svg" alt="linkedin profile"/>
										</a>
									) : (
										<img src="../../assets/img/linked_in_2.svg" alt="linkedin profile"/>
									)}
								</div>
								<div>
									{specificUser.github ? (
										<a href={`${specificUser.github}`} target='_blank' rel="noreferrer">
											<img src="../../assets/img/github_2.svg" alt="github profile"/>
										</a>
									) : (
										<img src="../../assets/img/github_2.svg" alt="github profile"/>
									)}
								</div>
								<div>
									{specificUser.portfolio_page ? (
										<a href={specificUser.portfolio_page} target='_blank' rel="noreferrer">
											<img src="../../assets/img/chain_link.png" alt="portfolio"/>
										</a>
									) : (
										<img src="../../assets/img/chain_link.png" alt="portfolio"/>
									)}
								</div>
								{canEditProfile &&
								<div className='edit-profile-button'>
									<img style={{cursor: "pointer"}} src="/assets/img/edit-icon.svg" alt="edit button" id="editLinks" onClick={handleOpen} />
								</div>}
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
                    
				</div>
				<div className="user-info">
					<div style={{display: "flex"}} className="tech-stack">
						<ul>
							{specificUser.tech_stack.map((tech, index) => (
								<li key={`${tech}-${index}`}>
									<button className="tech-chip">
										{tech}
									</button>
								</li>
							))}
							{canEditProfile && 
                        <div>
                            <img style={{cursor: "pointer"}} src="/assets/img/edit-icon.svg" alt="edit button" id="editTech" onClick={handleOpen} />
                        </div>}
                        </ul>
					</div>
				</div>
				<div className='user-projects'>
					{specificUser.portfolio_projects.map((project) => (
						<PortfolioProject key={project._id} canEditProfile={canEditProfile} portfolioProject={project} specificUserId={specificUser._id}/>
					))}
					{canEditProfile && 
						<div className='add-project-div'>
							<button onClick={handleOpenProjectCreator} className='add-project-button'>
								<img src="../../assets/img/plus-sign.svg" alt="add project"/>
							</button>
							<p>Add Project</p>
						</div>
					}
				</div>
			</div>
			<Modal
				open={openImage}
				onClose={handleClose}
                id="photoModal"
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<form id="userPhoto" className="modal-form" onSubmit={uploadImage}>
						<div className="modal-header">
							<h4>Update Profile Picture</h4>
						</div>
						<label>Image Path</label>
						<input name='photoInput' type="file" onChange={handleChange} />
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
				<Box sx={modalStyle}>
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
				<Box sx={modalStyle}>
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
			<Modal
				open={openProjectCreator}
                id="projectModal"
				onClose={handleCloseProjectCreator}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<CreateProjectModal handleCreateProject={handleCreateProject} createdProject={createdProject} handleProjectChange={handleProjectChange}  />
				</Box>
			</Modal>
			<Modal
				open={openLinks}
                id="linksModal"
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<form id="profileLinks" className="modal-form" onSubmit={handleFormUpdate}>
						<div className="modal-header">
							<h4>Update Links</h4>
						</div>
						<label htmlFor='linkedin'>LinkedIn: </label>
						<input id="linkedin" name='linkedin' value={profileLinks.linkedin} onChange={handleChange} className="modal-input" />
						<label htmlFor='github'>Github: </label>
						<input id='github' name='github' value={profileLinks.github} onChange={handleChange} className="modal-input" />
						<label htmlFor='portfolio_page'>Porfolio Page: </label>
						<input id="portfolio_page" name='portfolio_page' value={profileLinks.portfolio_page} onChange={handleChange} className="modal-input" />
						<button className="modal-button" type="submit">
							Update
						</button>
					</form>
				</Box>
			</Modal>
			<Modal
				open={openPins}
				onClose={handleClosePins}
                id="pinModal"
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<div id="userPins" className="modal-form">
						<div className="modal-header">
							<h4>Pinned Posts</h4>
						</div>
						{specificUser.pinned_posts.map((pin) => (
							<div className="chat subthread" data-id={pin.post._id} key={pin.post._id} >
							<div className="pos post-bar">
								<div>
									<span className="chat-name">{pin.post.author.username}</span>
									<span className="chat-date">{pin.date_created}</span>
								</div>
							</div>
							<p className="pos post-text">{pin.post.post_text}</p>
							</div>
						))}
					</div>
				</Box>
			</Modal>
		</div>
		</React.Fragment>
	);
}

export default ProfileInfo;
