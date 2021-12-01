import React from "react";
import cactusVideo from "./video/CACTUSVIDEO.mp4";

const splashpage = () => {
    return (
        <div className="App">
            <video autoPlay loop muted
            
            style={{
                postition:"absolute",
                width="100%",
                left="50%",
                top:"50%",
                height: "100%",
                objectFit: "cover",
                transform: "translate(-50%, -50%)",
                zIndex: "-1",
            }}
            >
                <source src={cactusVideo} type="video/mp4" />
            </video>
        </div>
    );
};

export default splashpage;