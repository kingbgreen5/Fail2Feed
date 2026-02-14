

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul>
        {isAuthenticated ? (
          <>
           <span>
            

        </span>
        <li>Fail2Feed</li>
            <li>
              <NavLink to="/guns" className={({ isActive }) => isActive ? "active" : ""}>
                The Data
              </NavLink>
            </li>
            <li>
              <NavLink to="/collection" className={({ isActive }) => isActive ? "active" : ""}>
                My Collection
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-report" className={({ isActive }) => isActive ? "active" : ""}>
                Create Report
              </NavLink>
            </li>
            <li>
              {/* <NavLink to="/search" className={({ isActive }) => isActive ? "active" : ""}>
                Advanced Search
              </NavLink> */}
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
                <li></li>
                <li></li>
                      Welcome {user?.username ? ` ${user.username}` : ""}
          </>
        ) : (
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
