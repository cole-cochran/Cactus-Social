import React from "react";
import AuthService from "../utils/auth";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
                    <p>Description:</p>
                    <p>{portfolioProject.description}</p>
                </div>
                <div>
                    <p>Responsibilities:</p>
                    <p>{portfolioProject.responsibilities}</p>
                </div>
                <div>
                    <p>Tech-Stack:</p>
                    <p>{portfolioProject.techstack}</p>
                </div>
            </div>
            <div className="portfolio-bottom">
                <div className="portfolio-links">
                    <div>
                        {portfolioProject.repo}
                    </div>
                    <div>
                        {portfolioProject.demo}
                    </div>
                </div>
                {canEditProfile && 
                    <div className="edit-button-div">
                        <button className="edit-button">
                            Edit
                        </button>
                    </div>
                }
            </div>
            {/* <Modal
				open={openProjectEditor}
                id="bioModal"
				onClose={handleCloseEditor}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form id="userBio" className="modal-form" onSubmit={handleUpdateProject}>
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
                        <button className="modal-button" type="submit">
							Update
						</button>
					</form>
				</Box>
			</Modal> */}
            
        </div>
    )
} 