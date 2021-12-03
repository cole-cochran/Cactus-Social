import React from "react";
import cactusVideo from "./CACTUSVIDEO.mp4";

function SplashPage(){
    return (
        <div className="App">
            <video autoPlay loop muted
            
            style={{
                postition:"absolute",
                width:"100vw",
                // left:"50%",
                // top:"50%",
                height: "100vh",
                objectFit: "cover",
                // transform: "translate(-50%, -50%)",
                zIndex: "-1",
            }}
            >
                <source src={cactusVideo} type="video/mp4" />
            </video>
        </div>
    );
};

export default SplashPage;