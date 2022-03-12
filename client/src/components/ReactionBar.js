import React from "react";

import { Emoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default function ReactionBar(props) {

    const { reactions } = props;
    //* reactions is an array of emoji codes

    let groupedReactions = {};

    for (let reaction of reactions) {
        if (!groupedReactions[reaction]) {
            groupedReactions[reaction] = 1;
        } else {
            groupedReactions[reaction] += 1;
        }
    }

    let updatedReactions = [];

    for (let group in groupedReactions) {
        let element = {
            emoji: group,
            count: groupedReactions[group]
        };
        updatedReactions.push(element);
    }

    return (
        <React.Fragment>
            {updatedReactions.map((reaction) => (
                <div className="emoji-box">
                    <Emoji emoji={{ id: `${reaction.emoji}` }} size={24} />
                    <div className="emoji-count">
                        {reaction.count}
                    </div>
                </div>
            ))}
        </React.Fragment>
    )
}