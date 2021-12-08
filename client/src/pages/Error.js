import React from "react";
import ScriptTag from 'react-script-tag';
import NavBar from "../components/NavBar";
import {Helmet} from "react-helmet";

export default function Error() {
    return(
       
<main class="error-page-body">
    <div>
        <NavBar/>
     </div>   
    <div>   
    <div id="parallax_illustration">
            <img src="../assets/img/error.png" alt="Error page with a bird and text" class="js-plaxify" data-invert="true" data-xrange="50" data-yrange="50" width="100%" ></img>
            <Helmet>
    <script src=
        "../components/Parallax" 
    type="text/javascript" />
    </Helmet>
        </div>
    </div>     
    <section class="error-banner">
        <h1>
            Cactus Social<br/>
            A sleek, secure,<br/>
            and transparent platform...
        </h1>
    </section>
    
</main>
    )
}

