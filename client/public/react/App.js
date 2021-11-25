import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from '../../src/components/home'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        // <Router>
        //     <Routes>
        //         <Route path="/login" element={Login}/>
        //         <Route path="form-submit" element={}/> 
        //     </Routes>
        // </Router>
        <>
            <div>
                <Home />
            </div>
            {
                (loggedIn) ? (
                    <div>
                        <Dashboard />
                    </div>
                ) : (
                    <div>
                        <Login />
                    </div>
                )
            }
        </>
    )
}
