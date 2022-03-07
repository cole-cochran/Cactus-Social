import React from 'react';
import ThreadPost from "./ThreadPost";
import InvitationModal from "./InvitationModal";

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { ALL_THREAD_POSTS, THREAD_DETAILS, USER_PROFILE } from '../utils/queries';

import { CREATE_POST, PIN_POST, UNPIN_POST, REMOVE_POST, UPDATE_POST, REMOVE_THREAD, LEAVE_THREAD } from '../utils/mutations';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PinnedPost } from './PinnedPost';

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

	let updatedThreadPosts;

	const { threadId } = useParams();

	const {activeThread, socket, setActiveComment} = props;

	const userId = AuthService.getProfile().data._id;

	const [ createPost ] = useMutation(CREATE_POST, {
		refetchQueries: [
			THREAD_DETAILS,
			'threadDetails'
		],
	});

	const [ removePost ] = useMutation(REMOVE_POST, {
		refetchQueries: [
			THREAD_DETAILS,
			'threadDetails'
		],
	});

	const [ updatePost ] = useMutation(UPDATE_POST, {
		refetchQueries: [
			THREAD_DETAILS,
			'threadDetails'
		],
	});

	const [ updatePinnedPost ] = useMutation(PIN_POST, {
		refetchQueries: [
			USER_PROFILE,
			'userProfile'
		],
	});

	const [ leaveThread ] = useMutation(LEAVE_THREAD);

	const [ removeThread ] = useMutation(REMOVE_THREAD);

	const [ removePinnedPost ] = useMutation(UNPIN_POST);

	const singleThread = useQuery(THREAD_DETAILS, {
		variables: { threadId: threadId }
	});

	const threadPosts = useQuery(ALL_THREAD_POSTS, {
		variables: { threadId: threadId }
	});

	const userData = useQuery(USER_PROFILE, {
		variables: { userId: userId }
	});

	const errors = singleThread.error || threadPosts.error || userData.error;
	const loading = singleThread.loading || threadPosts.loading || userData.loading;

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
	const [openInvite, setOpenInvite] = React.useState(false);

	const [postList, setPostList] = React.useState([]);
	
	const [messageTimeout, setMessageTimeout] = React.useState(false);


	const handleRemoveThread = () => {
		try {
			removeThread({
				variables: {
					threadId: threadId
				}
			})
		} catch(err) {
			console.error(err);
		}

		window.location.replace(`/profile/${userId}`);
	}

	React.useEffect(() => {
		socket.emit("join_thread", {room: activeThread, user: AuthService.getProfile().data.username});
	}, [activeThread]);

	React.useEffect(() => {
		socket.on('receive_post', (data) => {
			setPostList(postList => [...postList, data]);
		})
	}, [socket]);

	const handleOpenDropdown = (event) => {
		const postData = event.target.parentNode.parentNode.parentNode.getAttribute('data-id');
		localStorage.setItem('postId', JSON.stringify(postData));
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

	const handleOpenThreadDropdown = (event) => {
		const content = event.target.parentNode.childNodes[1];
		content.style.display = "flex";
	}

	const handleCloseThreadDropdown = (event) => {
		if (event.target.className !== "thread-dropdown-content" && event.target.className !== "dots" && event.target.className !== "dropdown-option") {
			const threadDrop = document.querySelector('.thread-dropdown-content');
			if (threadDrop) {threadDrop.style.display = "none";}
		}
	}

	const handleOpenInvite = (event) => {
		setOpenInvite(true);
	}

	const handleCloseInvite = (event) => {
		setOpenInvite(false);
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

	const handleLeaveThread = async (event) => {
		event.preventDefault();
		try {
			await leaveThread({
				variables: {
					userId: userId,
					threadId: threadId
				}
			})
		} catch (err) {
			console.log(err);
		}
		window.location.replace(`/profile/${userId}`);
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
			if(socket) {
				const postData = await createPost({
					variables: {
						threadId: threadId,
						post_text: newPostText,
						author: userId
					}
				});
				// console.log(postData.data.createPost);
				socket.emit("send_post", {room: activeThread, user: AuthService.getProfile().data.username, post: postData.data.createPost});
				setMessageTimeout(true);
				setTimeout(() => {setMessageTimeout(false);}, 2000);
				
			}
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
                    userId: userId,
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
		setEditPost({ post_text: "" });
		localStorage.removeItem('postId');
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
					userId: userId,
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
		return (
			<p>Loading...</p>
		)
	} 

	if (userData.data.userProfile.pinned_posts.length) {
		const allUserPins = userData.data.userProfile.pinned_posts;

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

	const threadOwner = singleThread.data.threadDetails.moderator._id === userId;

	return (
		<React.Fragment>
		<main onClick={handleCloseDropdown} className="thread-wrapper">
			<div onClick={handleCloseThreadDropdown} className="thread-content-container" onLoad={scroll}>
				<div className='thread-top'>
					<div className="thread-header">
						<h3>{singleThread.data.threadDetails.title}</h3>
						<div>
							<p>Moderator: {singleThread.data.threadDetails.moderator.username}</p>
						</div>
						<div>
							{singleThread.data.threadDetails.private ? (
								<p>Invite Only</p>
							):(
								<p>Public Forum</p>
							)}
						</div>
					</div>
					{threadOwner ? 
					<div className="dropdown">
						<img className="dots" src="../../assets/img/purple_dots.png" alt="dots" style={{width: "30px", height: "auto", marginRight: "5px", cursor: "pointer"}} onClick={handleOpenThreadDropdown}/>
						<div className="thread-dropdown-content">
							<div className="dropdown-option" onClick={handleOpenInvite}>
								Invite Friends
							</div>
							<div onClick={handleRemoveThread} >
								Delete
							</div>
						</div>
					</div>
					: <div className="dropdown">
						<img className="dots" src="../../assets/img/purple_dots.png" alt="dots" style={{width: "30px", height: "auto", marginRight: "5px", cursor: "pointer"}} onClick={handleOpenThreadDropdown}/>
						<div className="thread-dropdown-content">
							<div onClick={handleLeaveThread} >
								Leave Thread
							</div>
						</div>
					</div>
					}
				</div>
				
				<div id="chats-container" className="chats-container">
					{errors && <h3 style={{ color: 'red' }}>{errors}</h3>}
					{updatedThreadPosts.map(
						(post) => (
							post.pinned ? (
								<PinnedPost key={post._id} post={post} unpin={handleUnpinPost} openEditor={handleOpenEditor}
								dropdown={handleOpenDropdown} remove={handleRemovePost} setActiveComment={setActiveComment}/>
							) : (
								<ThreadPost key={post._id} post={post} unpin={handleUnpinPost} pin={handleOpen} openEditor={handleOpenEditor}
								dropdown={handleOpenDropdown} remove={handleRemovePost} setActiveComment={setActiveComment}/>
							)
						)
					)}
					{postList.filter(item => item["thread"]._id === threadId).map(
						(post) => (
							<ThreadPost key={post._id} post={post} unpin={handleUnpinPost} pin={handleOpen} openEditor={handleOpenEditor}
							dropdown={handleOpenDropdown} 
							remove={handleRemovePost} />
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
					<Modal
                        data-id="invite"
						open={openInvite}
						onClose={handleCloseInvite}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<InvitationModal itemId={threadId} itemType="thread" handleCloseInvite={handleCloseInvite} />
						</Box>
					</Modal>
				</div>
				<form onSubmit={handlePostSubmit} className="chat-input">
					{/* <span onChange={handleChange} name="postText" value={newPostText} contentEditable></span> */}
					<textarea onChange={handleChange} name="postText" value={newPostText} contentEditable  autoComplete='off' />
                    {/* <input onChange={handleChange} name="postText" value={newPostText} contentEditable autoComplete='off'/> */}
					<div className="chat-input-buttons">
						<button type="submit" className="chat-input-send-button" disabled={messageTimeout}>Submit</button>
					</div>
					{messageTimeout && newPostText ? <div style={{color: 'white'}}>You have to wait 2 seconds before sending another message</div> : <React.Fragment />}
				</form>
			</div>
		</main>
		</React.Fragment>
	);
}

export default ThreadDisplay;