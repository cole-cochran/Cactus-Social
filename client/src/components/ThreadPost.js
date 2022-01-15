import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";

export function ThreadPost(props) {

    const { post, pin, openEditor } = props;

    const owner = AuthService.getProfile().data._id;

    return (
        <div data-id={post._id} key={post._id} className="chat">
            <div className="pos post-bar">
                <div>
                    <span className="chat-name">{post.author.username}</span>
                    <span className="chat-date">{post.date_created}</span>
                </div>
                {owner === post.author._id ? (
                    <div>
                        <img src="../../assets/img/dotdotdot.svg" alt="post settings" style={{width: "24px", height: "24px", cursor: "pointer", marginRight: "4px"}} onClick={openEditor}/>
                    </div>
                ) : (null)}
            </div>
            <p className="pos post-text">{post.post_text}</p>
            <div className='post-options'>
                <button className='comments-chip'>
                <div>{post.comments.length}</div>
                <Link className='react-link' to={`/subthread/${post._id}`}>
                    {post.comments.length === 1 ? (<p>Comment</p>) : (<p>Comments</p>)}
                    </Link>
                </button>
                <img src="../../assets/img/tac-pin.svg" alt="pin" style={{width: "24px", height: "24px", cursor:"pointer"}} onClick={pin}/>
            </div>
        </div>
    )
}


