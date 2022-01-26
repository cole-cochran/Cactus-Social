import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";

export function ThreadPost(props) {

    const { post, pin, openEditor, dropdown, remove, setActiveComment } = props;

    const owner = AuthService.getProfile().data._id;

    return (
        <div data-id={post._id} key={post._id} className="chat">
            <div className="pos post-bar">
                <div>
                    <span className="chat-name">{post.author.username}</span>
                    <span className="chat-date">{post.date_created}</span>
                    {post.edited ? (<span className="edit-span">(edited)</span>):(null)}
                </div>
                {
                owner === post.author._id ? 
                <div className="dropdown">
                    <img className="dots" src="../../assets/img/purple_dots.png" alt="dots" style={{width: "30px", height: "auto", marginRight: "5px", cursor: "pointer"}} onClick={dropdown}/>
                    <div className="dropdown-content">
                        <div className="dropdown-option" onClick={openEditor}>
                            Update
                        </div>
                        <div onClick={remove} >
                            Delete
                        </div>
                    </div>
                </div>
                : <React.Fragment />
                }
            </div>
            <p className="pos post-text">{post.post_text}</p>
            <div className='post-options'>
                <button className='comments-chip'>
                <div>{post.comments.length}</div>
                <Link className='react-link' to={`/subthread/${post._id}`} onClick={setActiveComment}>
                    {post.comments.length === 1 ? (<span>Comment</span>) : (<span>Comments</span>)}
                    </Link>
                </button>
                {/* {owner === post.author._id ? 
                (null) : ( */}
                <img src="../../assets/img/purple_pin.png" alt="pin" style={{width: "30px", height: "auto", cursor:"pointer"}} onClick={pin}/>
                {/* )} */}
            </div>
        </div>
    )
}


