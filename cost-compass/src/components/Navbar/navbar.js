import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo kode-mono-o">COSTCOMPASS</div>
            <div className="desktopMenu">
                <Link className="desktopMenuListItem kode-mono-o" to="/">MAP</Link>
                <Link className="desktopMenuListItem kode-mono-o" to="/resources">RESOURCES</Link>
            </div>
        </nav>
    );
}

export default Navbar;
