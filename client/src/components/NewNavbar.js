import React from "react";
import { Link } from "react-router-dom";
import AuthService from '../utils/auth';

export default function NewNavbar() {
    const userId = AuthService.getProfile().data._id;

    const [dropdown, setDropdown] = React.useState(false);

    const handleOpenDropdown = async (event) => {
        setDropdown(true);
        setTimeout(() => {
            document.body.addEventListener("click", handleCloseDropdown);
        }, 500)
    }

    const handleCloseDropdown = (e) => {
        if (e.target.className !== "nav-dropdown-content" && e.target.className !== "dropdown-option") {
            setDropdown(false)
        }
        document.body.removeEventListener("click",handleCloseDropdown);
    }

    console.log(dropdown)
    return (
        <div className="new-navbar">
            <p className="logo">Cactus Social</p>
            <div id= "nav-dropdown-icon">
                <img src="/assets/img/cactus_nav_icon.png" alt="cactus menu icon" onClick={handleOpenDropdown}></img>
            
            <div className="nav-dropdown">
                <div style={{display: dropdown ? "block" : "none"}}id="nav-dropdown-content"className="event-dropdown-content">
                    <Link to={`/profile/${userId}`}>
                        <div className="dropdown-option">Profile</div>
                    </Link>
                    <div onClick={AuthService.logout} className="dropdown-option">
                        Logout
                    </div>
                </div>
            </div></div>
        </div>
    )
}