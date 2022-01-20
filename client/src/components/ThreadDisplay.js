import React from 'react';
// import { Link } from 'react-router-dom';
import { ThreadPost } from "../components/ThreadPost";

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { ALL_THREAD_POSTS, THREAD_DETAILS, USER_PROFILE } from '../utils/queries';
//* THREAD_DETAILS requires threadId and gives us access to

// import { ADD_POST_REACTION, REMOVE_THREAD } from '../utils/mutations';
import { CREATE_POST, PIN_POST, UNPIN_POST, REMOVE_POST, UPDATE_POST } from '../utils/mutations';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PinnedPost } from './PinnedPost';

import { io } from 'socket.io-client';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24
};


function ThreadDisplay(props) {

	// TODO (threadDisplay) Option for flagging a post as inappropriate LATER? 

	// TODO (threadDisplay) Allow only thread owners to delete thread

	let updatedThreadPosts;

	const { threadId } = useParams();

	const [ createPost ] = useMutation(CREATE_POST, {
		refetchQueries: [
			ALL_THREAD_POSTS,
			'allThreadPosts'
		],
	});

	const [ removePost ] = useMutation(REMOVE_POST, {
		refetchQueries: [
			ALL_THREAD_POSTS,
			'allThreadPosts'
		],
	});

	const [ updatePost ] = useMutation(UPDATE_POST, {
		refetchQueries: [
			ALL_THREAD_POSTS,
			'allThreadPosts'
		],
	});

	const [ updatePinnedPost ] = useMutation(PIN_POST, {
		refetchQueries: [
			USER_PROFILE,
			'userProfile'
		],
	});

	const [ removePinnedPost ] = useMutation(UNPIN_POST);

	const singleThread = useQuery(THREAD_DETAILS, {
		variables: { threadId: threadId }
	});

	const threadPosts = useQuery(ALL_THREAD_POSTS, {
		variables: { threadId: threadId }
	});

	const userData = useQuery(USER_PROFILE, {
		variables: { userId: AuthService.getProfile().data._id }
	});

	const errors = singleThread.error || threadPosts.error || userData.error;
	const loading = singleThread.loading || threadPosts.loading || userData.loading;

	// const [state, dispatch] = React.useReducer(reducer, initialState, init);

	const [ open, setOpen ] = React.useState(false);
	const [ openEditor, setOpenEditor ] = React.useState(false);

	const [ newPostText, setNewPostText ] = React.useState('');
	const [editPost, setEditPost] = React.useState({
		post_text: ""
	});
	const [ pinnedPost, setPinnedPost ] = React.useState(
        {
            pinTitle: '',
            pinHash: ''
        }
    );

	//! Change this to the threadPosts as initial state, I'm pretty sure it'll run an error though so might need to send this state down as a prop to a post component to avoid such issues, I'll test this further when I have the socket implemented - Ethan
	const [postList, setPostList] = React.useState([]);

    const socket = io.connect('localhost:3001');
	socket.on('connect', () => {
		console.log("I'm connected with the backend");
		socket.emit("join_thread", {room: threadId, user: AuthService.getProfile().data.username});
	});

	const handleOpenDropdown = (event) => {
		const postData = event.target.parentNode.parentNode.parentNode.getAttribute('data-id');
		localStorage.setItem('postId', JSON.stringify(postData));
		console.log(event.target.parentNode.childNodes[1]);
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

	const handleOpenEditor = (event) => {
		const currentText = event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].textContent;
		setEditPost({
			post_text: currentText
		})
        setOpenEditor(true);
	}

	const handleCloseEditor = (event) => {
		localStorage.removeItem('postId');
        setOpenEditor(false);
	}

	const handleOpen = (event) => {
        localStorage.setItem('postId', JSON.stringify(event.target.parentNode.parentNode.getAttribute('data-id')));
        setOpen(true);
    }
	const handleClose = (event) => {
        localStorage.removeItem('postId');
        setOpen(false);
    }

	const handleRemovePost = (event) => {
		event.preventDefault();
        const postId = JSON.parse(localStorage.getItem('postId'))

		try {
			removePost({
				variables: {
					threadId: threadId,
					postId: postId
				}
			})
		} catch(err) {
			console.error(err);
		}

		localStorage.removeItem('postId');
	}
	
	const handlePostSubmit = async (event) => {
		event.preventDefault();
		try { 
			await createPost({
				variables: {
					threadId: singleThread.data.threadDetails._id,
                    post_text: newPostText,
					author: AuthService.getProfile().data._id
				}
			});
            // window.location.reload(false);
		} catch (err) {
			console.error(err);
		}

		setNewPostText('');
	};

    const handlePinPost = async (event) => {
		event.preventDefault();
        const postId = JSON.parse(localStorage.getItem('postId'))

		try {
			await updatePinnedPost({
				variables: {
                    userId: AuthService.getProfile().data._id,
                    postId: postId,
					pinTitle: pinnedPost.pinTitle,
                    pinHash: pinnedPost.pinHash
				}
			});

			setPinnedPost({
				pinTitle: '',
				pinHash: ''
			});

			handleClose();

		} catch (err) {
			console.error(err);
		}
	};

	const handleEditPost = async (event) => {
		event.preventDefault();
		const postId = JSON.parse(localStorage.getItem('postId'));
		try {
			await updatePost({
				variables: {
					threadId: singleThread.data.threadDetails._id,
					postId: postId,
					post_text: editPost.post_text
				}
			})
		} catch (err) {
			console.error(err);
		}
		setEditPost({ post_text: "" })
		handleCloseEditor();
	}

	let usersThreadPins;

	const handleUnpinPost = async (event) => {
		event.preventDefault();
		const postId = event.target.parentNode.parentNode.getAttribute('data-id');

		const foundPinArr = usersThreadPins.filter((post) => (
			post.post._id === postId ? post : null
		));

		const foundPin = foundPinArr[0];

		try {
			await removePinnedPost({
				variables: {
					userId: AuthService.getProfile().data._id,
					pinnedId: foundPin._id
				}
			})
		} catch (err) {
			console.error(err);
		}
	}

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'postText') {
            setNewPostText(value);
        } else if (name === 'pinTitle') {
            setPinnedPost({
                ...pinnedPost,
                pinTitle: value
            })
        } else if (name === 'pinHash') {
            setPinnedPost({
                ...pinnedPost,
                pinHash: value
            })
        } else if (name === 'editedPost') {
			setEditPost({
				post_text: value
			})
		}
    };

	if (loading) {
		return <img src="../../assets/img/cactus_loading.svg" alt="loading icon"/>
	}

	if (userData.data.userProfile.pinned_posts.length) {
		const allUserPins = userData.data.userProfile.pinned_posts;
		console.log(allUserPins)

		usersThreadPins = allUserPins.filter((pinnedPost) => (
			pinnedPost.post.thread._id === threadId
		));

		const userPinIds = usersThreadPins.map((pin) => {
			return pin.post._id
		});

		updatedThreadPosts = threadPosts.data.allThreadPosts.map((threadPost) => {
			if (userPinIds.indexOf(threadPost._id) !== -1) {
				return {
					...threadPost,
					pinned: true
				}
			} else {
				return {
					...threadPost,
					pinned: false
				}
			}
		});
	} else {
		updatedThreadPosts = threadPosts.data.allThreadPosts;
	}

	const scroll = () => {
		var element = document.getElementById("chats-container");
		element.scrollTop = element.scrollHeight;
	}

	return (
		<main onClick={handleCloseDropdown} className="thread-wrapper">
			<div className="thread-content-container" onLoad={scroll}>
				<div className="thread-header">
					<h3>{singleThread.data.threadDetails.title}</h3>
					<div>
						<p>M: {singleThread.data.threadDetails.moderator.username}</p>
					</div>
				</div>
				<div id="chats-container" className="chats-container">
					{errors && <h3 style={{ color: 'red' }}>{errors}</h3>}
					{updatedThreadPosts.map(
						(post) => (
							post.pinned ? (
								<PinnedPost key={post._id} post={post} unpin={handleUnpinPost} openEditor={handleOpenEditor}
								dropdown={handleOpenDropdown} remove={handleRemovePost} />
							) : (
								<ThreadPost key={post._id} post={post} unpin={handleUnpinPost} pin={handleOpen} openEditor={handleOpenEditor}
								dropdown={handleOpenDropdown} remove={handleRemovePost} />
							)
						)
					)}
					<Modal
                        data-id="pinning"
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<form className="modal-form" onSubmit={handlePinPost}>
								<div className="modal-header">
									<h4>Add Subthread</h4>
								</div>
								<label>Pin Title</label>
								<input value={pinnedPost.pinTitle} name="pinTitle" onChange={handleChange} placeholder="e.g. Cactus Party" />
								<label>Pin Hash</label>
								<input value={pinnedPost.pinHash} name="pinHash" onChange={handleChange} placeholder="e.g. #cactus-party" />
								<button className="modal-button" type="submit">
									Add
								</button>
							</form>
						</Box>
					</Modal>
					<Modal
                        data-id="editor"
						open={openEditor}
						onClose={handleCloseEditor}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<form className="modal-form" onSubmit={handleEditPost}>
								<div className="modal-header">
									<h4>Update Post</h4>
								</div>
								<label>Post Text</label>
								<input value={editPost.post_text} name="editedPost" onChange={handleChange} placeholder="e.g. Cactus Party" />
								<button className="modal-button" type="submit">
									Update
								</button>
							</form>
						</Box>
					</Modal>
				</div>
				<form onSubmit={handlePostSubmit} className="chat-input">
					{/* <span onChange={handleChange} name="postText" value={newPostText} contentEditable></span> */}
                    <input onChange={handleChange} name="postText" value={newPostText} contentEditable autoComplete='off'/>
					<div className="chat-input-buttons">
						<button type="submit" className="chat-input-send-button">Send</button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default ThreadDisplay;