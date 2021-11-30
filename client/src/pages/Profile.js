<<<<<<< HEAD
// import React from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import ProfileDisplay from "./ProfileDisplay";


// function Profile(props) {
//     return (
//         <React.Fragment>
//         <Header/>
//             <div className="app-content-container">
//                 <Sidebar/>
//                 <ThreadDisplay/>
//                 <ProfileDisplay/>
//             </div>
//             <Footer/>
//         </React.Fragment>
//     )
// }

// export default Profile;
=======
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProfileInfo from "../components/ProfileInfo";
import ProfileFriends from "../components/ProfileFriends";


function Profile(props) {
    return (
        <React.Fragment>
        <Header/>
            <div className="app-content-container">
                <Sidebar/>
                <ProfileInfo/>
                <ProfileFriends/>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Profile;
>>>>>>> a88d854eab87f12991ec51cb1488ed7291fe27fa
