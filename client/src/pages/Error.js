import React from "react";
import NavBar from "../components/NavBar";
// import Parallax from "/js/parallax"


export default function Error() {
    return(     
<main class="error-page-body">
    <div class="error-banner-mobile">
        <img src="#" alt=""/>
    </div>
    <div>   
    <div id="parallax_illustration">
            <img src="../assets/img/error.png" alt="Error page with a bird and text" class="js-plaxify" data-invert="true" data-xrange="50" data-yrange="50" 
                 id="parallax_sign" />
        </div>
    </div>     
    <section class="error-banner">
        <h1>
            Cactus Social<br/>
            A sleek, secure,<br/>
            and transparent platform...
        </h1>
    </section>

<footer class="mobile-dashboard-footer">
</footer>
    <script src="../js/parallax.js"></script>
    
    {/* <section class="error-banner">
        <h1>
            Cactus Social<br>
            A sleek, secure,<br>
            and transparent platform...
        </h1>
    </section> */}
</main>
    )
}

