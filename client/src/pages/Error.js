import React from "react";
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
        </div>
    </div>     
    <section class="error-banner">
        <h1>
            Cactus Social<br/>
            A sleek, secure,<br/>
            and transparent platform...
        </h1>
    </section>
    <Helmet>
    <script type="text/javascript" src=
        "../parallax.js" 
    type="text/javascript" />
    </Helmet>
</main>
    )
}

