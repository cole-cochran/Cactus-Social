import React from 'react';
// import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

// import { PINNED_POSTS } from '../utils/queries';
import { ALL_THREAD_POSTS, THREAD_DETAILS, USER_PROFILE } from '../utils/queries';
//* THREAD_DETAILS requires threadId and gives us access to

// import { ADD_POST_REACTION, REMOVE_THREAD, UPDATE_POST, REMOVE_POST } from '../utils/mutations';
import { CREATE_POST, PIN_POST, UNPIN_POST } from '../utils/mutations';

//! Give description of imported mutations

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
	
	// TODO (threadDisplay) Make a separate option to show more options in a dropdown to do any sort of "alteration" mutation: editing, deleting
	// TODO (threadDisplay) Option for flagging a post as inappropriate LATER? 
	// TODO (threadDisplay) Allow only thread owners to delete thread
	// TODO (threadDisplay) Allow users to unpin from their pinned posts

	let updatedThreadPosts;

	const { threadId } = useParams();

	const [ createPost ] = useMutation(CREATE_POST);
	// const [ removePost ] = useMutation(REMOVE_POST);
	const [ updatePinnedPost ] = useMutation(PIN_POST);
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

	const [ open, setOpen ] = React.useState(false);

	const [ newPostText, setNewPostText ] = React.useState('');
	// const [editPost, setEditPost] = React.useState('');
	const [ pinnedPost, setPinnedPost ] = React.useState(
        {
            pinTitle: '',
            pinHash: ''
        }
    );

	const handleOpen = (event) => {
        localStorage.setItem('postId', JSON.stringify(event.target.parentNode.parentNode.getAttribute('data-id')));
        setOpen(true);
    }
	const handleClose = (event) => {
        localStorage.removeItem('postId');
        setOpen(false);
    }
	
	const handlePostSubmit = async (event) => {
		event.preventDefault();
		console.log(singleThread.data.threadDetails._id);
		console.log(newPostText);
		try {
			// const { data } = 
			await createPost({
				variables: {
					threadId: singleThread.data.threadDetails._id,
                    post_text: newPostText,
					author: AuthService.getProfile().data._id
				}
			});

			setNewPostText('');
			// setUpdatedPosts(true);
            // window.location.reload(false);
		} catch (err) {
			console.error(err);
		}
	};

    const handlePinPost = async (event) => {
		// event.preventDefault();
        const postId = JSON.parse(localStorage.getItem('postId'))

		try {
			// const { data } = 
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
        }
    };

	if (loading) {
		return <p>loading...</p>;
	} else {
		// console.log(threadPosts.data);
		// console.log(singleThread.data);
		// console.log(userData.data.userProfile.pinned_posts);
	}

	if (userData.data.userProfile.pinned_posts.length) {
		const allUserPins = userData.data.userProfile.pinned_posts;

		usersThreadPins = allUserPins.filter((pinnedPost) => (
			pinnedPost.post.thread._id === threadId
		));

		const userPinIds = usersThreadPins.map((pin) => {
			return pin.post._id
		});

		console.log("user's thread pins", usersThreadPins);

		console.log("user's thread pin ids", userPinIds);

		console.log(threadPosts.data.allThreadPosts);

		updatedThreadPosts = threadPosts.data.allThreadPosts.map((threadPost) => {
			if (userPinIds.indexOf(threadPost._id) !== -1) {
				console.log("found it")
				return {
					...threadPost,
					pinned: true
				}
			} else {
				console.log("nope")
				return {
					...threadPost,
					pinned: false
				}
			}
		});
	}

	console.log(updatedThreadPosts);

	return (
		<main className="thread-wrapper">
			<div className="thread-content-container">
				{/* <div className="top-panel"> */}
				<div className="thread-header">
					<h3>{singleThread.data.threadDetails.title}</h3>
					<div>
						<p>M: {singleThread.data.threadDetails.moderator.username}</p>
					</div>
				</div>
				<div className="chats-container">
					{errors && <h3 style={{ color: 'red' }}>{errors}</h3>}
					<div>
						{updatedThreadPosts.map(
							(post) => (
								post.pinned ? (
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
										<img src="../../assets/img/tac-pin.svg" alt="pin" style={{width: "24px", height: "24px", cursor:"pointer"}} onClick={handleUnpinPost}/>
										</div>
									</div>
								) : (
									<div data-id={post._id} key={post._id} className="chat">
										<div className="pos">
											<span className="chat-name">{post.author.username}</span>
											<span className="chat-date">{post.date_created}</span>
										</div>
										<p className="pos">{post.post_text}</p>
										<div className='post-options'>
											<button className='comments-chip'>
											<div>{post.comments.length}</div>
											<Link className='react-link' to={`/subthread/${post._id}`}>
												{post.comments.length === 1 ? (<p>Comment</p>) : (<p>Comments</p>)}
												</Link>
											</button>
											<img src="../../assets/img/tac-pin.svg" alt="pin" style={{width: "24px", height: "24px", cursor:"pointer"}} onClick={handleOpen}/>
									</div>
									</div>
								)
                            )
						)}
					</div>
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
				</div>
				{/* </div> */}
				<form onSubmit={handlePostSubmit} className="chat-input">
					{/* <span onChange={handleChange} name="postText" value={newPostText} contentEditable></span> */}
                    <input onChange={handleChange} name="postText" value={newPostText} contentEditable></input>
					<div className="chat-input-buttons">
						<button type="submit" className="chat-input-send-button">Send</button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default ThreadDisplay;
