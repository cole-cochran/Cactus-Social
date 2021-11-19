import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Login from './components/Login';

export default function App() {
    return (
        <>
            <div>
                <Navbar />
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
