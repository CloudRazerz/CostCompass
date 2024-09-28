import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo kode-mono-o">COSTCOMPASS</div>
            <div className="desktopMenu">
                <ScrollLink className="desktopMenuListItem kode-mono-o" to="INTRODUCTION" smooth={true} duration={500}>INTRODUCTION</ScrollLink>
                <ScrollLink className="desktopMenuListItem kode-mono-o" to="MAP" smooth={true} duration={500}>MAP</ScrollLink>
                <ScrollLink className="desktopMenuListItem kode-mono-o" to="RESOURCES" smooth={true} duration={500}>RESOURCES</ScrollLink>
            </div>
        </nav>
    );
}

export default Navbar;