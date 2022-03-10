import React from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';

import { EVENT_DETAILS, THREAD_DETAILS, POST_DETAILS, CHAT_DETAILS } from '../utils/queries';

import { ADD_EVENT_COMMENT_REACTION, ADD_POST_COMMENT_REACTION, ADD_POST_REACTION, ADD_CHAT_MESSAGE_REACTION } from "../utils/mutations";

export default function EmojiPicker(props) {

    //TODO  Let user hover over reactions to see who has posted them

    //TODO  Give user ability to undo (remove) reactions 

    const userId = AuthService.getProfile().data._id;

    const { elementId, elementType, parentId, closeEmojiMart } = props;

    const [ addChatMessageReaction ] = useMutation(ADD_CHAT_MESSAGE_REACTION, {
        refetchQueries: [
            CHAT_DETAILS,
            "chatDetails"
        ]
    })

    const [ addEventCommentReaction ] = useMutation(ADD_EVENT_COMMENT_REACTION, {
        refetchQueries: [
            EVENT_DETAILS,
            "eventDetails"
        ]
    });

    const [ addPostReaction ] = useMutation(ADD_POST_REACTION, {
        refetchQueries: [
            THREAD_DETAILS,
            "threadDetails"
        ]
    });

    const [ addPostCommentReaction ] = useMutation(ADD_POST_COMMENT_REACTION, {
        refetchQueries: [
            POST_DETAILS,
            "postDetails"
        ]
    });

    const handleAddReaction = async (emoji) => {
        if (elementType === "post") {
            try {
                await addPostReaction({
                variables: {
                        threadId: parentId,
                        postId: elementId,
                        reaction: emoji.id
                    }
                })
            } catch (err) {
                console.log(err);
            }
        } else if (elementType === "post-comment") {
            try {
                await addPostCommentReaction({
                variables: {
                        postId: parentId,
                        commentId: elementId,
                        reaction: emoji.id
                    }
                })
            } catch (err) {
                console.log(err);
            }
        } else if (elementType === "event-comment") {
            try {
                await addEventCommentReaction({
                variables: {
                        eventId: parentId,
                        commentId: elementId,
                        reaction: emoji.id
                    }
                })
            } catch (err) {
                console.log(err);
            }
        } else if (elementType === "chat-message") {
            try {
                await addChatMessageReaction({
                    variables: {
                        messageId: elementId,
                        chatId: parentId,
                        reaction: emoji.id
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
        closeEmojiMart();
    };

    return (
        <div>
            <Picker onSelect={handleAddReaction} />
        </div>
    );
}

