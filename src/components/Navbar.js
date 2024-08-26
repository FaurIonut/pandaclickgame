import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Make sure to style the navbar using CSS

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" >
      <i className="fa-solid fa-gamepad  fa-fw fa-2x"></i>
      </NavLink>
      <NavLink to="/boosters" >
      <i className="fa fa-bolt fa-fw fa-2x"></i>
      </NavLink>
      <NavLink to="/tasks" >
      <i className="fa-solid fa-gift fa-fw fa-2x"></i>
      </NavLink>
      <NavLink to="/referral" >
      <i className="fa-solid fa-users fa-fw fa-2x"></i>
      </NavLink>
    </nav>
  );
}

export default Navbar;
