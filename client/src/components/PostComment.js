import React from "react";

export default function PostComment (props) {

    const {comment, owner, handleOpenDropdown, handleOpenEditor, handleRemoveComment} = props;

    return (
        <div key={comment._id} data-id={comment._id} className="chat">
            <div className="pos post-bar">
                <div>
                    <span className="chat-name">{comment.author.username}</span>
                    <span className="chat-date">{comment.date_created}</span>
                    {comment.edited ? (<span className="edit-span">(edited)</span>):(null)}
                </div>
                { owner === comment.author._id ? 
                <div className="dropdown">
                    <img className="dots" src="../../assets/img/purple_dots.png" alt="pin" style={{width: "30px", height: "auto", marginRight: "5px", cursor: "pointer"}} onClick={handleOpenDropdown}/>
                    <div className="dropdown-content">
                        <div className="dropdown-option" onClick={handleOpenEditor}>
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