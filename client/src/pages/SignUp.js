import React from "react";

function SignUp(props) {
    return (
        <div className="signup-page-body">
            <div className="signup-banner-mobile">
                <img src="#" alt=""/>
            </div>
            <div className="signup-form-section">    
                <form class="signup-form">
                    <h3>Don't have an account?</h3>
                    <h3>Signup for Cactus Social!</h3>
                    <label for="signup-name">Name</label>
                    <input type="text" id="signup-name"/>
                    <label for="signup-email">Email Address</label>
                    <input type="text" id="signup-email"/>
                    <label for="signup-password">Password</label>
                    <input type="text" id="signup-password"/>
                    <button>Signup</button>
                </form>
            </div>
            <div className="signup-banner">
                <h1>
                    A sleek, secure,<br/>
                    and transparent platform...
                </h1>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                    excepturi sint occaecat
                </p>
                <img src="" alt=""/>
            </div>
        </div>
    )
}

export default SignUp;