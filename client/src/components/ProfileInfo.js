import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Axios from "axios";
import { CloudinaryContext, Image } from 'cloudinary-react';

import PortfolioProject from './PortfolioProject';

import { ADD_TECH, REMOVE_TECH, UPDATE_BIO, UPDATE_PHOTO, SEND_FRIEND_REQUEST, REMOVE_FRIEND, CREATE_PORTFOLIO_PROJECT, UPDATE_USER_LINKS } from '../utils/mutations';
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
	const [createdProject, setCreatedProject] = React.useState(
		{
			title: "",
			description: "",
			image: "",
			responsibilities: "",
			techstack: "",
			repo: "",
			demo: ""
		}
	);
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

	const getAllUsers = useQuery(ALL_USERS);
	const getAllFriends = useQuery(USER_FRIENDS, {
		variables: {
			userId: userId
		}
	});

	const loading = getAllUsers.loading || getAllFriends.loading;

	const uploadImage = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("file", photo);
		formData.append("upload_preset", "b3zjdfsi");
		formData.append("public_id", photo.lastModified);
		formData.append("folder", "CactusSocial");

		console.log(photo);

		await updatePhoto({
			variables: {
				userId: AuthService.getProfile().data._id,
				picture: `${photo.lastModified}`
			}
		});
		
		const response = await Axios.post("https://api.cloudinary.com/v1_1/damienluzzo/image/upload", formData);
		console.log(response);

		setPhoto('');
		setOpenImage(false);
	}

	console.log(specificUser)

	// const displayImage = async () => {
	// 	const response = await Axios.get(`https://api.cloudinary.com/v1_1/damienluzzo/resources/image/CactusSocial/${specificUser.picture}`);
	// 	console.log(response)
	// 	console.log(response.data.resources)
	// 	// const profileImage = response.data.resources;
	// }

	const handleOpenProjectCreator = (event) => {
		setOpenProjectCreator(true);
	}

	const handleCloseProjectCreator = (event) => {
		setOpenProjectCreator(false);
	}

	const handleProjectChange = async (event) => {
		const {value, name} = event.target;
		console.log({value, name});
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
		
		console.log(createdProject)
	}

	const handleCreateProject = async (event) => {
		event.preventDefault();
		console.log(createdProject);

		if (createdProject.image !== "") {
			const formData = new FormData();
			formData.append("file", createdProject.image);
			formData.append("upload_preset", "b3zjdfsi");
			formData.append("public_id", createdProject.image.lastModified);
			formData.append("folder", "CactusSocial");
			
			const response = await Axios.post("https://api.cloudinary.com/v1_1/damienluzzo/image/upload", formData);
			console.log(response);
		}

		try {
			await createPortfolioProject({
				variables: {
					owner: userId,
					title: createdProject.title,
					description: createdProject.description,
					image: (createdProject.image === "" ? "" : `${createdProject.image.lastModified}`),
					responsibilities: createdProject.responsibilities,
					techstack: createdProject.techstack,
					repo: createdProject.repo,
					demo: createdProject.demo
				}
			})
		} catch(err) {
			console.log(err);
		}

		setCreatedProject({
			title: "",
			description: "",
			image: "",
			responsibilities: "",
			techstack: "",
			repo: "",
			demo: ""
		});
		handleCloseProjectCreator();
	}
	
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
				console.log(event.target.files);
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
				
			// } else if (event.target.id === 'userPhoto') {
			// 	event.preventDefault();
			// 	// const updatedPhoto = 
			// 	await updatePhoto({
			// 		variables: {
			// 			userId: AuthService.getProfile().data._id,
			// 			picture: photo
			// 		}
			// 	});
			// 	setPhoto('');
			// 	setOpenImage(false);
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

	let userFirstNameArr = specificUser.first_name.split("");
	userFirstNameArr[0] = userFirstNameArr[0].toUpperCase();
	let updatedFirstName = userFirstNameArr.join("");

	let userLastNameArr = specificUser.last_name.split("");
	userLastNameArr[0] = userLastNameArr[0].toUpperCase();
	let updatedLastName = userLastNameArr.join("");

	return (
		<React.Fragment>
		<div className="profile-wrapper">
			<div className="profile-content-container">
				<div className="profile-header">
					<div className='profile-top'>
						<h3>{`${updatedFirstName} ${updatedLastName}`}</h3>
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
									<Image publicId={`CactusSocial/${specificUser.picture}`} />
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
						{canEditProfile && 
                        <div>
                            <img style={{cursor: "pointer"}} src="/assets/img/edit-icon.svg" alt="edit button" id="editTech" onClick={handleOpen} />
                        </div>}
						<ul>
							{specificUser.tech_stack.map((tech, index) => (
								<li key={`${tech}-${index}`}>
									<button className="tech-chip">
										{tech}
									</button>
								</li>
							))}
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
				<Box sx={style}>
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
			<Modal
				open={openProjectCreator}
                id="projectModal"
				onClose={handleCloseProjectCreator}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form id="userProject" className="modal-form modal-project" onSubmit={handleCreateProject}>
						<div className="modal-header">
							<h3>Create Project</h3>
						</div>
                        <div>
                            <label htmlFor="title" >Title</label>
                            <input id="title" name='title' value={createdProject.title} onChange={handleProjectChange}/>
                        </div>
						<div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" value={createdProject.description} onChange={handleProjectChange} className="modal-textarea" />
                        </div>
						<div>
                            <label htmlfor="addImage">Image</label>
                            <input type="file" id="addImage" name="addImage" onChange={handleProjectChange} />
                        </div>
						<div>
                            <label htmlFor="responsibilities">Responsibilities</label>
                            <textarea id="responsibilities" name="responsibilities" value={createdProject.responsibilities} onChange={handleProjectChange} className="modal-textarea" />
                        </div>
                        <div>
                            <label htmlFor="techstack">Tech Stack</label>
                            <textarea id="techstack" name="techstack" value={createdProject.techstack} onChange={handleProjectChange} className="modal-textarea" />
                        </div>
                        <div>
                            <label htmlFor="repo" >Repo Link</label>
                            <input id="repo" name='repo' value={createdProject.repo} onChange={handleProjectChange}/>
                        </div>
                        <div>
                            <label htmlFor="demo" >Live/Demo Link</label>
                            <input id="demo" name='demo' value={createdProject.demo} onChange={handleProjectChange}/>
                        </div>
                        <button className="modal-button" type="submit">
							Create
						</button>
					</form>
				</Box>
			</Modal>
			<Modal
				open={openLinks}
                id="linksModal"
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
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
		</div>
		</React.Fragment>
	);
}

export default ProfileInfo;
