import React from "react";
import AuthService from "../utils/auth";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { useMutation } from '@apollo/client';
import { UPDATE_PORTFOLIO_PROJECT, DELETE_PORTFOLIO_PROJECT } from "../utils/mutations";
import { USER_PROFILE } from "../utils/queries";
import ProfileInfo from "./ProfileInfo";


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

export default function PortfolioProject(props) {
    
    const { portfolioProject, canEditProfile, specificUserId } = props;

    const userId = AuthService.getProfile().data._id;

    const [ updatePortfolioProject ] = useMutation(UPDATE_PORTFOLIO_PROJECT, {
        refetchQueries: [
            USER_PROFILE,
            "userProfile"
        ]
    });

    const [ deletePortfolioProject ] = useMutation(DELETE_PORTFOLIO_PROJECT, {
        refetchQueries: [
            USER_PROFILE,
            "userProfile"
        ]
    });

    const [openProjectEditor, setOpenProjectEditor] = React.useState(false);

    const [editedProject, setEditedProject] = React.useState({
        title: portfolioProject.title,
        description: portfolioProject.description,
        image: portfolioProject.image,
        responsibilities: portfolioProject.responsibilities,
        techstack: portfolioProject.techstack,
        repo: portfolioProject.repo,
        demo: portfolioProject.demo
    });

    const handleOpenProjectDropdown = async (event) => {
        console.log(event.target);
        const projId = event.target.parentNode.getAttribute("data-id");

        const display = event.target.parentNode.getAttribute('data-displays');
        console.log(display);

        const targetDropdown = document.getElementById(projId);

        if (display === "show") {

            targetDropdown.style.display = "none";

            event.target.style.transform = "rotate(267.5deg)";

            event.target.parentNode.setAttribute('data-displays', 'hidden');

        } else {

            targetDropdown.style.display = "block";

            event.target.style.transform = "rotate(87.5deg)";

            event.target.parentNode.setAttribute('data-displays', 'show');

        }

        
    }

    const handleCloseProjectDropdown = async (event) => {

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEditedProject({
            ...editedProject,
            [name]: value
        })
    }

    const handleOpenEditor = (event) => {
        setOpenProjectEditor(true);
    }

    const handleCloseEditor = (event) => {
        setOpenProjectEditor(false);
    }

    const handleUpdateProject = async (event) => {
        event.preventDefault();
        console.log(editedProject);
        console.log(portfolioProject);

        try {
            await updatePortfolioProject({
                variables: {
                    userId: userId,
                    projectId: portfolioProject._id,
                    title: editedProject.title,
                    description: editedProject.description,
                    image: editedProject.image,
                    responsibilities: editedProject.responsibilities,
                    techstack: editedProject.techstack,
                    repo: editedProject.repo,
                    demo: editedProject.demo
                }
            })
        } catch(err) {
            console.log(err);
        }
        handleCloseEditor();
    }

    const handleDeleteProject = async (event) => {
        event.preventDefault();
        try {
            await deletePortfolioProject({
                variables: {
                    userId: userId,
                    projectId: portfolioProject._id
                }
            })
        } catch(err) {
            console.log(err);
        }
        handleCloseEditor();
    }

    return (
        <div className="portfolio-project-card">
            <div className="portfolio-image">
                {portfolioProject.image === "" ? (
                    <img src="../../assets/img/cactus-profile.svg" alt="placeholder"/>
                ) : (
                    <img src={`${portfolioProject.image}`} alt="portfolio preview" />
                )}
            </div>
            <div className="portfolio-body">
                <div>
                    <h2>{portfolioProject.title}</h2>
                </div>
                <div>
                    {/* <p>Description:</p> */}
                    <p>{portfolioProject.description}</p>
                </div>
                <div className="project-dropdown">
                    <div data-id={portfolioProject._id} data-displays="hidden" className="dropdown-button-div">
                        <span>See More</span>
                        <img style={{cursor: "pointer"}} src="../../assets/img/cactus_opener.png" alt="show more" onClick={handleOpenProjectDropdown}/>
                    </div>
                    <div id={portfolioProject._id} className="dropdown-project-content">
                        <div>
                            <p>Responsibilities:</p>
                            <p>{portfolioProject.responsibilities}</p>
                        </div>
                        <div>
                            <p>Tech-Stack:</p>
                            <p>{portfolioProject.techstack}</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className="portfolio-bottom">
                <div className="portfolio-links">
                    <div>
                        <a href={portfolioProject.repo}>Repo Link</a>
                    </div>
                    <div>
                        <a href={portfolioProject.demo}>
                            Live/Demo Link
                        </a>
                        
                    </div>
                </div>
                {canEditProfile && 
                    <div className="edit-button-div">
                        {/* <button onClick={handleOpenEditor} className="edit-button">
                            Edit
                        </button> */}
                        <img style={{cursor: "pointer"}} src="/assets/img/edit-icon.svg" alt="edit button" id="editTech" onClick={handleOpenEditor}  />
                        
                    </div>
                }
            </div>
            <Modal
				open={openProjectEditor}
                id="projectModal"
				onClose={handleCloseEditor}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form id="userProject" className="modal-form" onSubmit={handleUpdateProject}>
						<div className="modal-header">
							<h3>Update Project</h3>
						</div>
                        <div>
                            <label htmlFor="title" >Title</label>
                            <input id="title" name='title' value={editedProject.title} onChange={handleChange}/>
                        </div>
						<div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" value={editedProject.description} onChange={handleChange} className="modal-textarea" />
                        </div>
						<div>
                            <label htmlFor="responsibilities">Responsibilities</label>
                            <textarea id="responsibilities" name="responsibilities" value={editedProject.responsibilities} onChange={handleChange} className="modal-textarea" />
                        </div>
                        <div>
                            <label htmlFor="techstack">Tech Stack</label>
                            <textarea id="techstack" name="techstack" value={editedProject.techstack} onChange={handleChange} className="modal-textarea" />
                        </div>
                        <div>
                            <label htmlFor="repo" >Repo Link</label>
                            <input id="repo" name='repo' value={editedProject.repo} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="repo" >Live/Demo Link</label>
                            <input id="repo" name='repo' value={editedProject.repo} onChange={handleChange}/>
                        </div>
                        <div className="modal-button-div">
                            <button className="modal-button" type="submit">
                                Update
                            </button>
                            <button className="modal-button delete-button" onClick={handleDeleteProject}>
                                Delete
                            </button>
                        </div>
                        

					</form>
				</Box>
			</Modal>
            
        </div>
    )
} 