import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Site navigation. Uses semantic <nav> and NavLink so the current page
 * gets an "active" class automatically, and every link is keyboard
 * focusable/reachable for accessibility.
 */
function Nav() {
  return (
    <header>
      <nav className="nav-bar" aria-label="Main navigation">
        <NavLink to="/" className="brand" aria-label="Little Lemon home">
          Little Lemon
        </NavLink>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking">Reserve a Table</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
