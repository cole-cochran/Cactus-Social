import React from 'react';
import { Link } from 'react-router-dom';
import PostComment from './PostComment';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { POST_DETAILS, ALL_POST_COMMENTS } from '../utils/queries';
//* THREAD_DETAILS requires threadId and gives us access to

import { CREATE_POST_COMMENT, UPDATE_POST_COMMENT, REMOVE_POST_COMMENT } from '../utils/mutations';

// import { REMOVE_POST, UPDATE_POST, UNPIN_POST, ADD_POST_REACTION, REMOVE_POST_COMMENT, ADD_POST_COMMENT_REACTION } from '../utils/mutations';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Avatar from '@mui/material/Avatar';
// import Chip from '@mui/material/Chip';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24
};

function SubthreadDisplay(props) {
	
	// TODO (subthreadDisplay) Make a separate option to show more options in a dropdown to do any sort of "alteration" mutation: editing, deleting of comments

	// TODO (subthreadDisplay) Option for flagging a comment as inappropriate ? 

	const { postId } = useParams();

	const { socket, activeComment, setActiveThread } = props;

	const owner = AuthService.getProfile().data._id;

	const [ createPostComment ] = useMutation(CREATE_POST_COMMENT);

	const [ removePostComment ] = useMutation(REMOVE_POST_COMMENT, {
		refetchQueries: [
			ALL_POST_COMMENTS,
			'allPostComments'
		]
	});

	const [ updatePostComment ] = useMutation(UPDATE_POST_COMMENT, {
		refetchQueries: [
			ALL_POST_COMMENTS,
			'allPostComments'
		]
	});

	const singlePost = useQuery(POST_DETAILS, {
		variables: { postId: postId }
	});

	const allPostComments = useQuery(ALL_POST_COMMENTS, {
		variables: { postId: postId }
	});

	const errors = singlePost.error || allPostComments.error;
	const loading = singlePost.loading || allPostComments.loading;

	const [ newCommentText, setNewCommentText ] = React.useState('');
	const [editedComment, setEditedComment] = React.useState('');
	const [openedEditor, setOpenedEditor] = React.useState(false);

	const [commentList, setCommentList] = React.useState([]);
	const [messageTimeout, setMessageTimeout] = React.useState(false);

	React.useEffect(() => {
		socket.emit("join_post", {room: postId, user: AuthService.getProfile().data.username})
	}, [activeComment]);

	React.useEffect(() => {
		socket.on('receive_comment', (data) => {
			setCommentList(commentList => [...commentList, data]);
		})
	}, [socket]);

	const handleOpenDropdown = (event) => {
		const commentData = event.target.parentNode.parentNode.parentNode.getAttribute('data-id');
		localStorage.setItem('commentId', JSON.stringify(commentData));
		const content = event.target.parentNode.childNodes[1];
		content.style.display = "flex";
	}

	const handleCloseDropdown = (event) => {
		if (event.target.className !== "dropdown-content" && event.target.className !== "dots" && event.target.className !== "dropdown-option") {
			const dropdowns = document.querySelectorAll('.dropdown-content');
			for (let dropdown of dropdowns) {
				dropdown.style.display = "none";
			}
		}
	}

	const handleCommentSubmit = async (event) => {
		event.preventDefault();

		try {
			const commentData = await createPostComment({
				variables: {
					postId: postId,
					comment_text: newCommentText,
                    author: AuthService.getProfile().data._id
				}
			});
			console.log(commentData.data.createPostComment);
			socket.emit("send_comment", {room: postId, user: AuthService.getProfile().data.username, comment: commentData.data.createPostComment});
			setNewCommentText('');
			setMessageTimeout(true);
			setTimeout(() => {setMessageTimeout(false)});
		} catch (err) {
			console.error(err);
		}
	};

	const handleRemoveComment = async (event) => {
		event.preventDefault();

		const commentId = JSON.parse(localStorage.getItem('commentId'))

		try {
			await removePostComment({
				variables: {
					postId: postId,
					commentId: commentId
				}
			})
		} catch (err) {
			console.error(err);
		}

		localStorage.removeItem('commentId');
	}

	const handleOpenEditor = async (event) => {
		const currentText = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].textContent;

		setEditedComment(currentText);
        setOpenedEditor(true);
	}

	const handleCloseEditor = async () => {
		localStorage.removeItem('commentId');
        setOpenedEditor(false);
	}

	const handleCommentUpdate = async (event) => {
		event.preventDefault();

		const commentId = JSON.parse(localStorage.getItem('commentId'))

		try {
			await updatePostComment({
				variables: {
					postId: postId,
					commentId: commentId,
					comment_text: editedComment
				}
			})
		} catch (err) {
			console.error(err);
		}

		setEditedComment("");
		localStorage.removeItem('commentId');
		handleCloseEditor();
	}

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'postCommentText') {
            setNewCommentText(value);
        } else if (name === 'editedCommentText') {
			setEditedComment(value)
		}
    };

	const scroll = () => {
		var element = document.getElementsByClassName("chats-container")[0];
		element.scrollTop = element.scrollHeight;
	}

	if (loading) {

		return (
			<div className='loading-icon-box'>
				<img className='loading-icon' src="../../assets/img/cactus_loading.svg" alt="loading icon"/>
			</div>
		)
	} 

	return (
		<main onClick={handleCloseDropdown} className="thread-wrapper">
			<div className="thread-content-container" onLoad={scroll}>
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
									<img src="../../assets/img/cactus_back.png" alt="go back" />
								</Link>
							</div>
							<p>{singlePost.data.postDetails.post_text}</p>
						</div>
						{allPostComments.data.allPostComments.map((comment) => (
							<PostComment comment={comment} owner={owner} handleOpenEditor={handleOpenEditor} handleOpenDropdown={handleOpenDropdown} handleRemoveComment={handleRemoveComment}/>
						))}
						{commentList.map(
							(comment) => (
								<PostComment comment={comment} owner={owner} handleOpenEditor={handleOpenEditor} handleOpenDropdown={handleOpenDropdown} handleRemoveComment={handleRemoveComment}/>
							))}
					</div>
					<form onSubmit={handleCommentSubmit} className="chat-input">
						<input onChange={handleChange} name="postCommentText" value={newCommentText} contentEditable autoComplete='off' />
						<div className="chat-input-buttons">
							<button type="submit" className="chat-input-send-button">
								send
							</button>
						</div>
						{messageTimeout && newCommentText ? <div style={{color: 'white'}}>You have to wait 2 seconds before sending another message</div> : <React.Fragment />}
					</form>
				</div>
			</div>
			<Modal
				data-id="editor"
				open={openedEditor}
				onClose={handleCloseEditor}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form className="modal-form" onSubmit={handleCommentUpdate}>
						<div className="modal-header">
							<h4>Edit Comment</h4>
						</div>
						<label>Comment Text</label>
						<input value={editedComment} name="editedCommentText" onChange={handleChange} placeholder="e.g. Cactus Party" />
						<button className="modal-button" type="submit">
							Update
						</button>
					</form>
				</Box>
			</Modal>
		</main>
	);
}

export default SubthreadDisplay;
