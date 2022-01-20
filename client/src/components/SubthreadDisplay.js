import React from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { POST_DETAILS, ALL_POST_COMMENTS } from '../utils/queries';
//* THREAD_DETAILS requires threadId and gives us access to

// import { REMOVE_POST, UPDATE_POST, UNPIN_POST, ADD_POST_REACTION, REMOVE_POST_COMMENT, UPDATE_POST_COMMENT, ADD_POST_COMMENT_REACTION } from '../utils/mutations';

import { CREATE_POST_COMMENT } from '../utils/mutations';

// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Avatar from '@mui/material/Avatar';
// import Chip from '@mui/material/Chip';

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 400,
// 	bgcolor: 'background.paper',
// 	boxShadow: 24
// };

function SubthreadDisplay(props) {
	
	// TODO (subthreadDisplay) Make a separate option to show more options in a dropdown to do any sort of "alteration" mutation: editing, deleting of comments

	// TODO (subthreadDisplay) Option for flagging a comment as inappropriate ? 

	const { postId } = useParams();

	const [ createPostComment ] = useMutation(CREATE_POST_COMMENT);

	const singlePost = useQuery(POST_DETAILS, {
		variables: { postId: postId }
	});

	const allComments = useQuery(ALL_POST_COMMENTS, {
		variables: { postId: postId }
	});

	const errors = singlePost.error || allComments.error;
	const loading = singlePost.loading || allComments.loading;

	const [ newCommentText, setNewCommentText ] = React.useState('');
	// const [editComment, setEditComment] = React.useState('');

	const handleCommentSubmit = async (event) => {
		event.preventDefault();

		try {
			await createPostComment({
				variables: {
					postId: postId,
					comment_text: newCommentText,
                    author: AuthService.getProfile().data._id
				}
			});

			setNewCommentText('');
			window.location.reload(false);
		} catch (err) {
			console.error(err);
		}
	};

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'postCommentText') {
            setNewCommentText(value);
        }
    };

	if (loading) {
		return <p>loading...</p>;
	}

	return (
		<main className="thread-wrapper">
			<div className="thread-content-container">
				<div className="top-panel">
					<div className="thread-header">
						<h3>{singlePost.data.postDetails.pinTitle}</h3>
					</div>
					<div className="chats-container">
						{errors && <h3 style={{ color: 'red' }}>{errors}</h3>}
						<div className="chat subthread">
							<div className='subthread-bar'>
								<div>
									<span className="chat-name">{singlePost.data.postDetails.author.username}</span>
									<span className="chat-date">{singlePost.data.postDetails.date_created}</span>
								</div>
								<Link className='back-button' to={`/threads/${singlePost.data.postDetails.thread._id}`}>
									<img src="../../assets/img/undo.png" alt="go back" />
								</Link>
							</div>
							<p>{singlePost.data.postDetails.post_text}</p>
						</div>
						{allComments.data.allPostComments.map((comment) => (
							<div key={comment._id} className="chat">
								<div>
									<span className="chat-name">{comment.author.username}</span>
									<span className="chat-date">{comment.date_created}</span>
								</div>
								<p>{comment.comment_text}</p>
							</div>
						))}
					</div>
					<form onSubmit={handleCommentSubmit} className="chat-input">
						<input onChange={handleChange} name="postCommentText" value={newCommentText} contentEditable autoComplete='off' />
						<div className="chat-input-buttons">
							<button type="submit" className="chat-input-send-button">
								send
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}

export default SubthreadDisplay;
