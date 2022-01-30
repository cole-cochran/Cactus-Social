import React from "react";

import { Emoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default function ReactionBar(props) {

    const { reactions } = props;
    //! reactions will be an array of emoji codes

    let groupedReactions = {};

    for (let reaction of reactions) {
        console.log(reaction)
        if (!groupedReactions[reaction]) {
            groupedReactions[reaction] = 1;
        } else {
            groupedReactions[reaction] += 1;
        }
    }

    let updatedReactions = [];

    console.log(groupedReactions)

    for (let group in groupedReactions) {
        console.log(group);
        let element = {
            emoji: group,
            count: groupedReactions[group]
        };
        console.log(element)
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