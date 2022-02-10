import React from "react";

export default function PortfolioProject(props) {
    return (
        <div className="portfolio-project-card">
            <div className="portfolio-image">
                <img src="../../assets/img/cactus-profile.svg" alt="placeholder"/>
            </div>
            <div className="portfolio-body">
                <div>
                    <p>Description:</p>
                    <p></p>
                </div>
                <div>
                    <p>Responsibilities:</p>
                    <p></p>
                </div>
                <div>
                    <p>Tech-Stack:</p>
                    <p></p>
                </div>
            </div>
            <div className="portfolio-links">
                <div>
                    Repo
                </div>
                <div>
                    Demo
                </div>
            </div>
            
        </div>
    )
} 