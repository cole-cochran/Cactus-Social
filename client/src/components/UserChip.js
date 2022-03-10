import React from "react";
import { CloudinaryContext, Image } from 'cloudinary-react';

export default function UserChip(props) {
    const {user} = props;

    return (
        <button className="friend-chips">
            {user.picture === "" ? (
                <img className="friend-pic" src="../../assets/img/github.svg" alt="friend avatar"/>
            ) : (
                <CloudinaryContext style={{display: "block"}} cloudName="damienluzzo" >
                    <Image className="friend-pic"  publicId={`CactusSocial/${user.picture}.${user.picture_type}`} />
                </CloudinaryContext>
            )}
            <p>{user.username}</p>
        </button>
    )
}