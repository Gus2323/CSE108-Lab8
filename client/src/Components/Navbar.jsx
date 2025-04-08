import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ userName = 'User', onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Trigger passed logout logic
        if (onLogout) onLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                {/* Left: Welcome message */}
                <span className="navbar-text fw-semibold">
                    Welcome, {userName}
                </span>

                {/* Center: School name and logo */}
                <div className="text-center">
                    <img
                        // src="/logo.png"
                        // alt="School Logo"
                        style={{ height: '40px', marginRight: '10px' }}
                    />
                    <span className="navbar-brand mb-0 h4">My School Portal</span>
                </div>

                {/* Right: Logout */}
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
