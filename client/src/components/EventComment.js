import React from "react";
import AuthService from '../utils/auth';

export default function EventComment(props) {

    const {comment, handleCommentDropdown, handleOpenCommentEditor, handleRemoveComment} = props;

    const owner = AuthService.getProfile().data._id;

    return (
        <div key={comment._id} data-id={comment._id} className="chat event-chat">
            <div className="pos post-bar">
                <div>
                    <span className="chat-name">{comment.author.username}</span>
                    <span className="chat-date">{comment.date_created}</span>
                    {comment.edited ? (<span className="edit-span">(edited)</span>):(null)}
                </div>
                { owner === comment.author._id ? 
                <div className="dropdown">
                    <img className="dots" src="../../assets/img/purple_dots.png" alt="dots" style={{width: "30px", height: "auto", marginRight: "5px", cursor: "pointer"}} onClick={handleCommentDropdown}/>
                    <div className="dropdown-content">
                        <div className="dropdown-option" onClick={handleOpenCommentEditor}>
                            Update
                        </div>
                        <div onClick={handleRemoveComment} >
                            Delete
                        </div>
                    </div>
                </div>
                : <React.Fragment />
            }
            </div>
            <p>{comment.comment_text}</p>
        </div>
    )

}