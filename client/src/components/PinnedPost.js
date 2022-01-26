import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";

export function PinnedPost(props) {

    const { post, unpin, openEditor, dropdown, remove, setActiveComment } = props;

    const owner = AuthService.getProfile().data._id;
    
    return (
        <div className="chat subthread" data-id={post._id} key={post._id} >
            <div className="pos post-bar">
                <div>
                    <span className="chat-name">{post.author.username}</span>
                    <span className="chat-date">{post.date_created}</span>
                    {post.edited ? (<span className="edit-span">(edited)</span>):(null)}
                </div>
                {
                owner === post.author._id && 
                <div className="dropdown">
                    <img className="dots" src="../../assets/img/dotdotdot.svg" alt="pin" style={{width: "24px", height: "24px", marginRight: "5px", cursor: "pointer"}} onClick={dropdown}/>
                    <div className="dropdown-content">
                        <div className="dropdown-option" onClick={openEditor}>
                            Update
                        </div>
                        <div onClick={remove} >
                            Delete
                        </div>
                    </div>
                </div>
                }
            </div>
            <p>{post.post_text}</p>
            <div className='post-options'>
                <button className='comments-chip'>
                    <div>{post.comments.length}</div>
                    <Link className='react-link' to={`/subthread/${post._id}`} onClick={setActiveComment}>
                        {post.comments.length === 1 ? (<span>Comment</span>) : (<span>Comments</span>)}
                        </Link>
                </button>
                <img src="../../assets/img/tac-pin.svg" alt="pin" style={{width: "24px", height: "24px", cursor:"pointer"}} onClick={unpin}/>
            </div>
        </div>
    )
}