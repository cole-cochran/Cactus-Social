import React from "react";
import { Link } from "react-router-dom";

export function PinnedPost(props) {

    const { post, unpin } = props;

    return (
        <div className="chat subthread" data-id={post._id} key={post._id} >
            <div className="pos">
                <span className="chat-name">{post.author.username}</span>
                <span className="chat-date">{post.date_created}</span>
                {post.pinHash && (
                    <span className="subthread-title">{post.pinHash}</span>
                )}
            </div>
            <p>{post.post_text}</p>
            <div className='post-options'>
                <button className='comments-chip'>
                    <div>{post.comments.length}</div>
                    <Link className='react-link' to={`/subthread/${post._id}`}>
                        {post.comments.length === 1 ? (<p>Comment</p>) : (<p>Comments</p>)}
                        </Link>
                </button>
                <img src="../../assets/img/tac-pin.svg" alt="pin" style={{width: "24px", height: "24px", cursor:"pointer"}} onClick={unpin}/>
            </div>
        </div>
    )
}