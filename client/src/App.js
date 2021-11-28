import './App.css';
import Dashboard from './jactus-components/Dashboard';
import Profile from './jactus-components/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/signup" element={<Dashboard/>}/>
            <Route path="/login" element={<Dashboard/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </Router>
  );
}

export default App;
