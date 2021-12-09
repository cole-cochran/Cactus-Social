import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { ALL_THREAD_POSTS, THREAD_DETAILS, PINNED_POSTS } from '../utils/queries';
//* THREAD_DETAILS requires threadId and gives us access to

import {
	CREATE_POST,
	REMOVE_POST,
	UPDATE_POST,
	PIN_POST,
	UNPIN_POST,
	ADD_POST_REACTION,
	REMOVE_THREAD
} from '../utils/mutations';
//! Give description of imported mutations

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

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
	const { threadId } = useParams();

	const [ createPost ] = useMutation(CREATE_POST);
	const [ removePost ] = useMutation(REMOVE_POST);
	const [ pinPost ] = useMutation(PIN_POST);
	const [ unpinPost ] = useMutation(UNPIN_POST);

	const singleThread = useQuery(THREAD_DETAILS, {
		variables: { threadId: threadId }
	});

	const threadPosts = useQuery(ALL_THREAD_POSTS, {
		variables: { threadId: threadId }
	});

	const errors = singleThread.error || threadPosts.error;
	const loading = singleThread.loading || threadPosts.loading;

	const [ newPostText, setNewPostText ] = React.useState('');
	// const [editPost, setEditPost] = React.useState('');
	const [ pinnedPost, setPinnedPost ] = React.useState(
        {
            pinTitle: '',
            pinHash: ''
        }
    );

	const handlePostSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await createPost({
				variables: {
					threadId: singleThread.data.threadDetails._id,
                    post_text: newPostText
				}
			});

			setNewPostText('');
		} catch (err) {
			console.error(err);
		}
	};

    const handlePinTitleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await pinPost({
				variables: {
					pinTitle: pinnedPost.pinTitle,
                    pinHash: pinnedPost.pinHash
				}
			});

			setNewPostText('');
		} catch (err) {
			console.error(err);
		}
	};

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'postText') {
            setNewPostText(value);
        } else if (name === 'pinTitle') {
            setPinnedPost({
                ...pinnedPost,
                pinTitle: pinnedPost.pinTitle
            })
        } else if (name === 'pinHash') {
            setPinnedPost({
                ...pinnedPost,
                pinHash: pinnedPost.pinHash
            })
        }
    };

	const [ open, setOpen ] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	if (loading) {
		return <p>loading...</p>;
	} else {
		console.log(threadPosts.data);
		console.log(singleThread.data);
	}

	return (
		<main className="thread-wrapper">
			<div className="thread-content-container">
				{/* <div className="top-panel"> */}
				<div className="thread-header">
					{/* <h3>Austin Code Bootcamp Students</h3> */}
					<h3>{singleThread.data.threadDetails.title}</h3>
					<div>
						{/* <p>M: Damien</p> */}
						<p>M: {singleThread.data.threadDetails.moderator.username}</p>
					</div>
				</div>
				<div className="chats-container">
					{errors && <h3 style={{ color: 'red' }}>{errors}</h3>}
					<div>
						{threadPosts.data.allThreadPosts.map(
							(post) =>
								post.pinned ? (
									<div key={post._id} className="chat subthread" onClick={handleOpen}>
										<div>
											<span className="chat-name">{post.author.username}</span>
											<span className="chat-date">{post.date_created}</span>
											{post.pinHash && (
												<Link to={`/subthread/${post._id}`}>
													<span className="subthread-title">{post.pinHash}</span>
												</Link>
											)}
										</div>
										<p>{post.post_text}</p>
										<Link to={`/profile/${post._id}`}>
											<Chip
												label="Comments"
												size="small"
												avatar={<Avatar>{post.comments.length}</Avatar>}
											/>
										</Link>
									</div>
								) : (
									<div key={post._id} className="chat" onClick={handleOpen}>
										<div>
											<span className="chat-name">{post.author.username}</span>
											<span className="chat-date">{post.date_created}</span>
										</div>
										<p>{post.post_text}</p>
										<Link to={`/profile/${post._id}`}>
											<Chip
												label="Comments"
												size="small"
												avatar={<Avatar>{post.comments.length}</Avatar>}
											/>
										</Link>
									</div>
								)
						)}
					</div>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<form className="modal-form">
								<div className="modal-header">
									<h4>Add Subthread</h4>
								</div>
								<label>Pin Title</label>
								<input placeholder="e.g. Cactus Party" />
								<label>Pin Hash</label>
								<input placeholder="e.g. #cactus-party" />
								<button className="modal-button" type="submit">
									Add
								</button>
							</form>
						</Box>
					</Modal>
				</div>
				{/* </div> */}
				{/* <div> */}
				{/* <div className="chat-input"> */}
				<form onSubmit={handlePostSubmit} className="chat-input">
					<span onChange={handleChange} name="postText" value={newPostText} contentEditable></span>
					<div className="chat-input-buttons">
						<button className="chat-input-send-button">send</button>
					</div>
				</form>
				{/* </div> */}
			</div>
		</main>
	);
}

export default ThreadDisplay;
